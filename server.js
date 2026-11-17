/* Feyzin 1966 — serveur de salle pour hébergement type Render.
   Node 20+, une seule dépendance : ws. Toute la logique de salle vient de src/engine/room.js,
   partagée avec la version Cloudflare : une seule vérité, deux transports. */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";

import { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, POSTES, ILLUS, ANIM, PART } from "./src/content.js";
import { physics, scenario, history } from "./src/data/bundle.js";
import { refineryMap } from "./src/views/map.js";
import { salleVide, rejoindre, voter, commander, demarrerSimulation, appliquerMajorite, etatPublic } from "./src/engine/room.js";

const PORT = process.env.PORT || 8787;
const FILM = "/extrait.webm";
const rooms = new Map();

function inject(tpl) {
  return tpl
    .replace("__STEPS__", JSON.stringify(STEPS))
    .replace("__INTRO__", JSON.stringify(INTRO))
    .replace("__MEDIA__", JSON.stringify(MEDIA))
    .replace("__ROLES__", JSON.stringify(ROLES))
    .replace("__ILLUS__", JSON.stringify(ILLUS))
    .replace("__POSTES__", JSON.stringify(POSTES))
    .replace("__FILM__", FILM)
    .replace("__CONC__", JSON.stringify(CONCLUSIONS))
    .replace("__HIST__", JSON.stringify(history))
    .replace("__MAP__", refineryMap.toString());
}

function room(code) {
  if (!rooms.has(code)) rooms.set(code, { salle: salleVide(), anim: new Set(), part: new Set(), touched: Date.now() });
  const r = rooms.get(code);
  r.touched = Date.now();
  return r;
}

const pub = (r) => etatPublic(r.salle, physics);

function broadcast(r) {
  const msg = JSON.stringify({ type: "state", state: pub(r) });
  for (const set of [r.anim, r.part]) {
    for (const ws of set) {
      if (ws.readyState === 1) { try { ws.send(msg); } catch (e) { set.delete(ws); } }
    }
  }
}

/* L'animateur ouvre la simulation quand il démarre une séance. */
function ouvrirSimulation(r) {
  if (!r.salle.sim || r.salle.sim.terminee) demarrerSimulation(r.salle, physics, scenario);
}

function onMessage(r, role, ws, raw, pid) {
  let m;
  try { m = JSON.parse(raw.toString()); } catch { return; }

  if (m.type === "join" && role === "part") {
    const p = rejoindre(r.salle, m.pid || pid, m.name);
    if (!p) return;
    ws.send(JSON.stringify({ type: "you", name: p.name, poste: p.poste }));
    return broadcast(r);
  }

  if (m.type === "vote" && role === "part") {
    if (voter(r.salle, m.pid || pid, Number(m.j))) {
      ws.send(JSON.stringify({ type: "voted", j: Number(m.j) }));
      broadcast(r);
    }
    return;
  }

  if (m.type === "ping") { ws.send(JSON.stringify({ type: "pong" })); return; }
  if (role !== "anim") return;

  if (m.type === "open" || m.type === "chapter" || m.type === "reset") ouvrirSimulationSiBesoin(r, m.type);

  const change = commander(r.salle, m.type, m, scenario, physics);

  if (m.type === "close" && r.salle.sim) {
    const choix = appliquerMajorite(r.salle, scenario, physics);
    if (choix !== null) r.salle.dernierChoix = choix;
  }

  if (change) broadcast(r);
}

function ouvrirSimulationSiBesoin(r, type) {
  if (type === "reset") { r.salle.sim = null; r.salle.fin = null; return; }
  if (!r.salle.sim) ouvrirSimulation(r);
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  const p = u.pathname;

  if (p === "/" || p === "/anim") return send(res, inject(ANIM));
  if (p === "/health") return json(res, { ok: true, rooms: rooms.size, uptime: Math.round(process.uptime()) });

  /* images fixes tirées de la scène 3D */
  if (p.startsWith("/etapes/") && /^\/etapes\/[a-z0-9_-]+\.jpg$/.test(p)) {
    const racine = path.dirname(fileURLToPath(import.meta.url));
    const fichier = path.join(racine, "public", p.replace(/^\//, ""));
    return fs.readFile(fichier, (err, data) => {
      if (err) { res.writeHead(404); res.end("introuvable"); return; }
      res.writeHead(200, { "content-type": "image/jpeg", "cache-control": "public, max-age=3600" });
      res.end(data);
    });
  }

  if (p === "/extrait.webm") {
    const root = path.dirname(fileURLToPath(import.meta.url));
    const file = path.join(root, "public", "extrait.webm");
    try {
      const st = fs.statSync(file);
      const range = req.headers.range;
      const head = { "content-type": "video/webm", "accept-ranges": "bytes", "cache-control": "public, max-age=3600" };
      if (range) {
        const m = /bytes=(\d*)-(\d*)/.exec(range);
        const start = m && m[1] ? parseInt(m[1], 10) : 0;
        const end = m && m[2] ? parseInt(m[2], 10) : st.size - 1;
        res.writeHead(206, { ...head, "content-range": `bytes ${start}-${end}/${st.size}`, "content-length": end - start + 1 });
        return fs.createReadStream(file, { start, end }).pipe(res);
      }
      res.writeHead(200, { ...head, "content-length": st.size });
      return fs.createReadStream(file).pipe(res);
    } catch (e) { res.writeHead(404); return res.end("Introuvable"); }
  }

  if (p === "/api/room") {
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 4; i++) s += A[Math.floor(Math.random() * A.length)];
    return json(res, { code: s });
  }

  if (p.startsWith("/p/")) {
    const code = p.slice(3).toUpperCase().trim();
    if (!/^[A-Z0-9]{4,8}$/.test(code)) { res.writeHead(400); return res.end("Code de salle invalide"); }
    return send(res, inject(PART).split("__CODE__").join(code));
  }

  res.writeHead(404); res.end("Introuvable");
});

function send(res, html) {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(html);
}
function json(res, o) {
  res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(o));
}

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname !== "/ws") { socket.destroy(); return; }
  const code = (u.searchParams.get("room") || "").toUpperCase();
  const role = u.searchParams.get("role") === "anim" ? "anim" : "part";
  const pid = (u.searchParams.get("pid") || "").slice(0, 40);
  if (!/^[A-Z0-9]{4,8}$/.test(code)) { socket.destroy(); return; }

  wss.handleUpgrade(req, socket, head, (ws) => {
    const r = room(code);
    r[role].add(ws);

    ws.send(JSON.stringify({ type: "state", state: pub(r), role }));
    if (pid && r.salle.voters[pid] !== undefined) ws.send(JSON.stringify({ type: "voted", j: r.salle.voters[pid] }));
    const moi = pid && r.salle.participants[pid];
    if (moi) ws.send(JSON.stringify({ type: "you", name: moi.name, poste: moi.poste }));
    broadcast(r);

    ws.on("message", (raw) => onMessage(r, role, ws, raw, pid));
    ws.on("close", () => { r[role].delete(ws); broadcast(r); });
    ws.on("error", () => { r[role].delete(ws); });
  });
});

// Une salle sans personne pendant deux heures est oubliée.
setInterval(() => {
  const now = Date.now();
  for (const [code, r] of rooms) {
    if (r.anim.size === 0 && r.part.size === 0 && now - r.touched > 2 * 3600 * 1000) rooms.delete(code);
  }
}, 10 * 60 * 1000).unref();

server.listen(PORT, () => console.log("Feyzin 1966 — salle prête sur le port " + PORT));
