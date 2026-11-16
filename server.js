/* Feyzin 1966 — serveur de salle pour hébergement type Render.
   Node 20+, une seule dépendance : ws. Même contenu et mêmes écrans que la version Cloudflare. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, ILLUS, ANIM, PART } from "./src/content.js";

const PORT = process.env.PORT || 8787;
const rooms = new Map();

const FILM = "/extrait.webm";

function inject(tpl) {
  return tpl
    .replace("__STEPS__", JSON.stringify(STEPS))
    .replace("__INTRO__", JSON.stringify(INTRO))
    .replace("__MEDIA__", JSON.stringify(MEDIA))
    .replace("__ROLES__", JSON.stringify(ROLES))
    .replace("__ILLUS__", JSON.stringify(ILLUS))
    .replace("__FILM__", FILM)
    .replace("__CONC__", JSON.stringify(CONCLUSIONS));
}
function fresh() {
  return { step: -1, phase: "lobby", intro: 0, votes: {}, voters: {}, n: 0 };
}
function room(code) {
  if (!rooms.has(code)) rooms.set(code, { game: fresh(), anim: new Set(), part: new Set(), touched: Date.now() });
  const r = rooms.get(code);
  r.touched = Date.now();
  return r;
}
function pub(r) {
  const g = r.game;
  return {
    step: g.step, phase: g.phase, intro: g.intro || 0, votes: g.votes,
    total: Object.values(g.votes).reduce((a, b) => a + b, 0),
    participants: r.part.size
  };
}
function broadcast(r) {
  const msg = JSON.stringify({ type: "state", state: pub(r) });
  for (const set of [r.anim, r.part]) {
    for (const ws of set) { if (ws.readyState === 1) { try { ws.send(msg); } catch (e) { set.delete(ws); } } }
  }
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  const p = u.pathname;

  if (p === "/" || p === "/anim") return send(res, inject(ANIM));
  if (p === "/health") return json(res, { ok: true, rooms: rooms.size, uptime: Math.round(process.uptime()) });
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
    if (pid && r.game.voters[pid] !== undefined) ws.send(JSON.stringify({ type: "you", j: r.game.voters[pid] }));
    broadcast(r);

    ws.on("message", (raw) => {
      let m; try { m = JSON.parse(raw.toString()); } catch { return; }
      const g = r.game;

      if (m.type === "vote" && role === "part" && g.phase === "vote" && g.step >= 0) {
        const pid = String(m.pid || "").slice(0, 40);
        if (!pid || typeof m.j !== "number" || m.j < 0 || m.j > 2) return;
        const prev = g.voters[pid];
        if (prev === m.j) return;
        if (prev !== undefined) g.votes[prev] = Math.max(0, (g.votes[prev] || 1) - 1);
        g.voters[pid] = m.j;
        g.votes[m.j] = (g.votes[m.j] || 0) + 1;
        if (ws.readyState === 1) ws.send(JSON.stringify({ type: "voted", j: m.j }));
        return broadcast(r);
      }

      if (role === "anim") {
        if (m.type === "open") { g.step = Math.max(0, Math.min(STEPS.length - 1, m.step ?? 0)); g.votes = {}; g.voters = {}; g.phase = "vote"; }
        if (m.type === "close") g.phase = "reveal";
        if (m.type === "next") { if (g.step < STEPS.length - 1) { g.step++; g.votes = {}; g.voters = {}; g.phase = "vote"; } else g.phase = "end"; }
        if (m.type === "back") { if (g.step > 0) { g.step--; g.votes = {}; g.voters = {}; g.phase = "vote"; } }
        if (m.type === "chapter") { g.phase = "intro"; g.intro = Math.max(0, Math.min(INTRO.length - 1, m.i ?? 0)); }
        if (m.type === "reset") { g.step = -1; g.phase = "lobby"; g.intro = 0; g.votes = {}; g.voters = {}; }
        broadcast(r);
      }
    });

    ws.on("close", () => { r[role].delete(ws); broadcast(r); });
    ws.on("error", () => { r[role].delete(ws); });
  });
});

// Une salle sans personne pendant 2 heures est oubliée.
setInterval(() => {
  const now = Date.now();
  for (const [code, r] of rooms) {
    if (r.anim.size === 0 && r.part.size === 0 && now - r.touched > 2 * 3600 * 1000) rooms.delete(code);
  }
}, 10 * 60 * 1000).unref();

server.listen(PORT, () => console.log("Feyzin 1966 — salle prête sur le port " + PORT));
