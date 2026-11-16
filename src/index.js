/* Feyzin 1966 — Worker Cloudflare.
   Même moteur et même machine à états de salle que le serveur Node : src/engine/room.js. */

import { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, POSTES, ILLUS, ANIM, PART } from "./content.js";
import { physics, scenario, history } from "./data/bundle.js";
import { refineryMap } from "./views/map.js";
import { salleVide, rejoindre, voter, commander, demarrerSimulation, appliquerMajorite, etatPublic } from "./engine/room.js";

const FILM = "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c5/Accident_Feyzin.ogv/Accident_Feyzin.ogv.480p.vp9.webm";

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    if (p === "/" || p === "/anim") return html(inject(ANIM));
    if (p === "/api/room") return json({ code: code4() });
    if (p === "/health") return json({ ok: true });

    if (p.startsWith("/p/")) {
      const code = p.slice(3).toUpperCase().trim();
      if (!/^[A-Z0-9]{4,8}$/.test(code)) return new Response("Code de salle invalide", { status: 400 });
      return html(inject(PART).split("__CODE__").join(code));
    }

    if (p === "/ws") {
      const code = (url.searchParams.get("room") || "").toUpperCase();
      if (!/^[A-Z0-9]{4,8}$/.test(code)) return new Response("bad room", { status: 400 });
      const id = env.ROOMS.idFromName(code);
      const stub = env.ROOMS.get(id);
      const u = new URL("https://do/ws");
      u.searchParams.set("role", url.searchParams.get("role") === "anim" ? "anim" : "part");
      u.searchParams.set("pid", (url.searchParams.get("pid") || "").slice(0, 40));
      return stub.fetch(new Request(u, request));
    }

    return new Response("Introuvable", { status: 404 });
  }
};

/* ---------- Durable Object : une salle ---------- */
export class Room {
  constructor(state) {
    this.state = state;
    this.canaux = { anim: new Set(), part: new Set() };
    this.salle = salleVide();
    this.state.blockConcurrencyWhile(async () => {
      const sauve = await this.state.storage.get("salle");
      if (sauve) this.salle = sauve;
    });
  }

  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname !== "/ws") return new Response("not found", { status: 404 });

    const role = url.searchParams.get("role") === "anim" ? "anim" : "part";
    const pid = (url.searchParams.get("pid") || "").slice(0, 40);
    const paire = new WebSocketPair();
    const [client, serveur] = Object.values(paire);
    serveur.accept();
    this.canaux[role].add(serveur);

    serveur.addEventListener("message", (m) => this.onMessage(role, serveur, m.data, pid));
    serveur.addEventListener("close", () => this.canaux[role].delete(serveur));
    serveur.addEventListener("error", () => this.canaux[role].delete(serveur));

    serveur.send(JSON.stringify({ type: "state", state: this.public(), role }));
    if (pid && this.salle.voters[pid] !== undefined) serveur.send(JSON.stringify({ type: "voted", j: this.salle.voters[pid] }));
    const moi = pid && this.salle.participants[pid];
    if (moi) serveur.send(JSON.stringify({ type: "you", name: moi.name, poste: moi.poste }));
    this.diffuser();

    return new Response(null, { status: 101, webSocket: client });
  }

  public() {
    return etatPublic(this.salle, physics);
  }

  onMessage(role, ws, raw, pid) {
    let m;
    try { m = JSON.parse(raw); } catch { return; }

    if (m.type === "join" && role === "part") {
      const p = rejoindre(this.salle, m.pid || pid, m.name);
      if (!p) return;
      ws.send(JSON.stringify({ type: "you", name: p.name, poste: p.poste }));
      this.persister();
      this.diffuser();
      return;
    }

    if (m.type === "vote" && role === "part") {
      if (voter(this.salle, m.pid || pid, Number(m.j))) {
        ws.send(JSON.stringify({ type: "voted", j: Number(m.j) }));
        this.persister();
        this.diffuser();
      }
      return;
    }

    if (m.type === "ping") { ws.send(JSON.stringify({ type: "pong" })); return; }
    if (role !== "anim") return;

    if (m.type === "reset") { this.salle.sim = null; this.salle.fin = null; }
    if ((m.type === "open" || m.type === "chapter") && !this.salle.sim) {
      demarrerSimulation(this.salle, physics, scenario);
    }

    const change = commander(this.salle, m.type, m, scenario, physics);
    if (m.type === "close" && this.salle.sim) appliquerMajorite(this.salle, scenario, physics);

    if (change) { this.persister(); this.diffuser(); }
  }

  async persister() {
    try { await this.state.storage.put("salle", this.salle); } catch (e) {}
  }

  diffuser() {
    const msg = JSON.stringify({ type: "state", state: this.public() });
    for (const set of [this.canaux.anim, this.canaux.part]) {
      for (const ws of set) {
        try { ws.send(msg); } catch (e) { set.delete(ws); }
      }
    }
  }
}

function code4() {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const r = crypto.getRandomValues(new Uint8Array(4));
  for (const b of r) s += A[b % A.length];
  return s;
}
const json = (o) => new Response(JSON.stringify(o), { headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
const html = (s) => new Response(s, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
