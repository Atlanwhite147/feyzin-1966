import { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, ANIM, PART } from "./content.js";

/* Feyzin 1966 — salle de vote en direct.
   Cloudflare Worker + Durable Object : une salle par code, votes en temps réel,
   l'histoire bifurque selon la majorité. */


export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    if (p === "/" || p === "/anim") return html(inject(ANIM));
    if (p === "/api/room") return json({ code: code4() });
    if (p.startsWith("/p/")) {
      const code = p.slice(3).toUpperCase().trim();
      if (!/^[A-Z0-9]{4,8}$/.test(code)) return new Response("Code de salle invalide", { status: 400 });
      return html(inject(PART).split("__CODE__").join(code));
    }
    if (p === "/ws") {
      const code = (url.searchParams.get("room") || "").toUpperCase();
      const role = url.searchParams.get("role") === "anim" ? "anim" : "part";
      if (!/^[A-Z0-9]{4,8}$/.test(code)) return new Response("bad room", { status: 400 });
      const id = env.ROOMS.idFromName(code);
      const stub = env.ROOMS.get(id);
      const u = new URL("https://do/ws");
      u.searchParams.set("role", role);
      return stub.fetch(new Request(u, request));
    }
    if (p === "/health") return json({ ok: true });
    return new Response("Introuvable", { status: 404 });
  }
};

function inject(tpl) {
  return tpl
    .replace("__STEPS__", JSON.stringify(STEPS))
    .replace("__INTRO__", JSON.stringify(INTRO))
    .replace("__MEDIA__", JSON.stringify(MEDIA))
    .replace("__ROLES__", JSON.stringify(ROLES))
    .replace("__CONC__", JSON.stringify(CONCLUSIONS));
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

/* ---------- Durable Object : une salle ---------- */
export class Room {
  constructor(state, env) {
    this.state = state;
    this.rooms = { anim: new Set(), part: new Set() };
    this.game = { step: -1, phase: "lobby", intro: 0, votes: {}, voters: {}, n: 0 };
    this.ended = false;
    this.state.blockConcurrencyWhile(async () => {
      const saved = await this.state.storage.get("game");
      if (saved) this.game = saved;
    });
  }

  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/ws") {
      const role = url.searchParams.get("role") === "anim" ? "anim" : "part";
      const pid = (url.searchParams.get("pid") || "").slice(0, 40);
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      server.accept();
      const set = this.rooms[role];
      set.add(server);
      if (role === "part") this.game.n++;
      server.addEventListener("message", (m) => this.onMessage(role, server, m.data));
      server.addEventListener("close", () => set.delete(server));
      server.addEventListener("error", () => set.delete(server));
      server.send(JSON.stringify({ type: "state", state: this.public(), role }));
      if (pid && this.game.voters[pid] !== undefined) server.send(JSON.stringify({ type: "you", j: this.game.voters[pid] }));
      this.broadcast();
      return new Response(null, { status: 101, webSocket: client });
    }
    return new Response("not found", { status: 404 });
  }

  public() {
    const v = this.game;
    const total = Object.values(v.votes).reduce((a, b) => a + b, 0);
    return { step: v.step, phase: v.phase, intro: v.intro || 0, votes: v.votes, total, participants: v.n };
  }

  async onMessage(role, ws, raw) {
    let m;
    try { m = JSON.parse(raw); } catch { return; }
    const g = this.game;

    if (m.type === "vote" && role === "part" && g.phase === "vote" && g.step >= 0) {
      const pid = String(m.pid || "").slice(0, 40);
      if (!pid || typeof m.j !== "number" || m.j < 0 || m.j > 2) return;
      const prev = g.voters[pid];
      if (prev === m.j) return;
      if (prev !== undefined) g.votes[prev] = Math.max(0, (g.votes[prev] || 1) - 1);
      g.voters[pid] = m.j;
      g.votes[m.j] = (g.votes[m.j] || 0) + 1;
      ws.send(JSON.stringify({ type: "voted", j: m.j }));
      this.persist(); this.broadcast();
      return;
    }

    if (role === "anim") {
      if (m.type === "open") { g.step = Math.max(0, Math.min(STEPS.length - 1, m.step ?? 0)); g.votes = {}; g.voters = {}; g.phase = "vote"; }
      if (m.type === "close") { g.phase = "reveal"; }
      if (m.type === "next") { if (g.step < STEPS.length - 1) { g.step++; g.votes = {}; g.voters = {}; g.phase = "vote"; } else { g.phase = "end"; } }
      if (m.type === "back") { if (g.step > 0) { g.step--; g.votes = {}; g.voters = {}; g.phase = "vote"; } }
      if (m.type === "chapter") { g.phase = "intro"; g.intro = Math.max(0, Math.min(INTRO.length - 1, m.i ?? 0)); }
      if (m.type === "reset") { g.step = -1; g.phase = "lobby"; g.intro = 0; g.votes = {}; g.voters = {}; }
      this.persist(); this.broadcast();
    }
  }

  async persist() { try { await this.state.storage.put("game", this.game); } catch (e) {} }

  broadcast() {
    const msg = JSON.stringify({ type: "state", state: this.public() });
    for (const set of [this.rooms.anim, this.rooms.part]) {
      for (const ws of set) { try { ws.send(msg); } catch (e) { set.delete(ws); } }
    }
  }
}

