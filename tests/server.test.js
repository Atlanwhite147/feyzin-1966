import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import WebSocket from "ws";
import vm from "node:vm";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8900 + Math.floor(Math.random() * 60);
const BASE = `http://127.0.0.1:${PORT}`;
let enfant;

function attendre(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function jusqua(fn, essais = 60) {
  for (let i = 0; i < essais; i++) {
    try { if (await fn()) return true; } catch (e) {}
    await attendre(100);
  }
  return false;
}

function client(role, code, pid) {
  const ws = new WebSocket(`ws://127.0.0.1:${PORT}/ws?room=${code}&role=${role}${pid ? "&pid=" + pid : ""}`);
  const messages = [];
  ws.on("message", (raw) => messages.push(JSON.parse(raw.toString())));
  return new Promise((resolve, reject) => {
    ws.on("open", () => resolve({ ws, messages, dernier: () => messages.filter((m) => m.type === "state").at(-1) }));
    ws.on("error", reject);
  });
}

const envoyer = (c, objet) => c.ws.send(JSON.stringify(objet));

before(async () => {
  enfant = spawn(process.execPath, ["server.js"], { cwd: racine, env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });
  const pret = await jusqua(async () => (await fetch(BASE + "/health")).ok);
  if (!pret) throw new Error("le serveur n'a pas démarré");
});

after(() => { if (enfant) enfant.kill("SIGTERM"); });

test("la page de salle se sert et embarque le plan et les données historiques", async () => {
  const r = await fetch(BASE + "/?room=TEST");
  assert.equal(r.status, 200);
  const html = await r.text();
  assert.match(html, /function refineryMap/);
  assert.match(html, /"frise"/);
  assert.match(html, /MAP\(S\.crise/);
  assert.match(html, /const MAP = function refineryMap/);
});

test("un code de salle trop court est refusé, un code valide est servi", async () => {
  assert.equal((await fetch(BASE + "/p/FIN")).status, 400);
  const ok = await fetch(BASE + "/p/ABCD");
  assert.equal(ok.status, 200);
  assert.match(await ok.text(), /Votre prénom|Feyzin/);
});

test("les scripts embarqués des deux pages se compilent", async () => {
  for (const url of ["/?room=VERI", "/p/VERI"]) {
    const html = await (await fetch(BASE + url)).text();
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    assert.ok(scripts.length >= 1, "un script doit être présent dans " + url);
    for (const code of scripts) {
      assert.doesNotThrow(() => new vm.Script(code), "script invalide dans " + url);
    }
  }
});

test("la santé répond et compte les salles", async () => {
  const j = await (await fetch(BASE + "/health")).json();
  assert.equal(j.ok, true);
  assert.equal(typeof j.rooms, "number");
});

test("le parcours complet diffuse la crise et termine sur un débrief", async () => {
  const code = "E2E1";
  const anim = await client("anim", code);
  const parts = [];
  for (const [nom, choix] of [["Claire", 2], ["Marc", 2], ["Sonia", 1], ["Yanis", 2]]) {
    const p = await client("part", code, nom.toLowerCase());
    envoyer(p, { type: "join", name: nom, pid: nom.toLowerCase() });
    parts.push({ p, choix });
  }
  await jusqua(() => anim.dernier()?.state.roster.length === 4);
  assert.equal(anim.dernier().state.roster.length, 4);

  envoyer(anim, { type: "open", step: 0 });
  await jusqua(() => anim.dernier()?.state.phase === "vote");

  for (const { p, choix } of parts) envoyer(p, { type: "vote", j: choix, pid: p.ws.url.split("pid=")[1] });
  assert.ok(await jusqua(() => (anim.dernier()?.state.total || 0) === 4), "les quatre votes doivent remonter");

  envoyer(anim, { type: "close" });
  assert.ok(await jusqua(() => anim.dernier()?.state.phase === "reveal"));
  const etat = anim.dernier().state;
  assert.ok(etat.majorite === 2, "la majorité doit être C");
  assert.ok(etat.crise, "le PC Secours doit recevoir l'état de crise");
  assert.ok(etat.tension && typeof etat.tension.texte === "string");
  assert.ok(etat.crise.nappe.masse > 0, "la fuite doit être simulée");
  assert.ok(Array.isArray(etat.criseJournal) && etat.criseJournal.length >= 1);

  for (let i = 1; i < 7; i++) {
    envoyer(anim, { type: "next" });
    await jusqua(() => anim.dernier()?.state.step === i);
    for (const { p, choix } of parts) envoyer(p, { type: "vote", j: choix % 3, pid: p.ws.url.split("pid=")[1] });
    await jusqua(() => (anim.dernier()?.state.total || 0) > 0);
    envoyer(anim, { type: "close" });
    await jusqua(() => anim.dernier()?.state.phase === "reveal");
  }
  envoyer(anim, { type: "next" });
  await jusqua(() => anim.dernier()?.state.phase === "end" || anim.dernier()?.state.fin);

  const fin = anim.dernier().state;
  assert.ok(fin.fin, "une fin doit être calculée");
  assert.ok(["maitrise", "bleve-contenu", "historique", "chaine"].includes(fin.fin.id));
  assert.equal(fin.debrief.lignes.length, 7);
  assert.ok(fin.debrief.synthese.decisions === 7);

  for (const { p } of parts) p.ws.close();
  anim.ws.close();
});

test("la réinitialisation ramène la salle à l'accueil", async () => {
  const code = "E2E2";
  const anim = await client("anim", code);
  envoyer(anim, { type: "open", step: 3 });
  await jusqua(() => anim.dernier()?.state.phase === "vote");
  envoyer(anim, { type: "reset" });
  assert.ok(await jusqua(() => anim.dernier()?.state.phase === "lobby"));
  assert.equal(anim.dernier().state.step, -1);
  anim.ws.close();
});
