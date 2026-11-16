import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { newGame, jouer, projection, tension, debrief, frise, synthese, conclusionTexte } from "../src/engine/index.js";
import { salleVide, rejoindre, voter, majorite, commander, demarrerSimulation, appliquerMajorite, etatPublic } from "../src/engine/room.js";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const physics = JSON.parse(fs.readFileSync(path.join(racine, "src/data/physics.json"), "utf8"));
const scenario = JSON.parse(fs.readFileSync(path.join(racine, "src/data/scenario.json"), "utf8"));

function partie(choix) {
  let g = newGame(physics, scenario);
  for (const c of choix) {
    g = { ...g, ...jouer(g, c) };
    if (g.terminee) break;
  }
  return g;
}

test("aucune rupture projetée si la purge est arrêtée", () => {
  const g = { ...newGame(physics, scenario), ...{} };
  const etat = partie([0, 0, 0, 0, 0, 0, 0]).state;
  assert.equal(projection(etat, physics), null);
});

test("la projection annonce une rupture à venir quand le feu est établi", () => {
  let g = newGame(physics, scenario);
  g = { ...g, ...jouer(g, 2) };
  g = { ...g, ...jouer(g, 0) };
  g = { ...g, ...jouer(g, 0) };
  g = { ...g, ...jouer(g, 0) };
  const p = projection(g.state, physics);
  assert.ok(p, "une rupture doit être projetée");
  assert.ok(p.minutes > 0 && p.minutes <= 240, "horizon crédible, obtenu " + p?.minutes);
  assert.match(p.heure, /^\d{2} h \d{2}$/);
});

test("la tension suit la proximité de la rupture", () => {
  let g = newGame(physics, scenario);
  g = { ...g, ...jouer(g, 2) };
  const t = tension(g.state, physics);
  assert.ok(["calme", "attention", "critique", "irreversible"].includes(t.niveau));
  assert.equal(typeof t.texte, "string");
});

test("la frise de débrief couvre les sept étapes jouées", () => {
  const g = partie([2, 0, 0, 0, 0, 0, 0]);
  const f = frise(g);
  assert.equal(f.length, 7);
  for (const l of f) {
    assert.ok(l.heure && l.titre && l.choix && l.ecart);
    assert.ok(["maitrise", "conforme", "retard", "aggravation"].includes(l.ecart));
  }
});

test("la synthèse compte autant de décisions que la frise", () => {
  const g = partie([2, 0, 0, 0, 0, 0, 0]);
  const d = debrief(g);
  const somme = d.synthese.maitrise + d.synthese.conforme + d.synthese.retard + d.synthese.aggravation;
  assert.equal(somme, d.synthese.decisions);
  assert.equal(d.synthese.decisions, 7);
});

test("chaque fin a un texte de conclusion", () => {
  const fins = [partie([0, 0, 0, 0, 0, 0, 0]), partie([2, 0, 0, 0, 0, 0, 0]), partie([2, 0, 0, 0, 1, 0, 0]), partie([2, 1, 1, 1, 1, 0, 0])];
  const ids = new Set();
  for (const g of fins) {
    const fin = g.fin;
    ids.add(fin.id);
    assert.ok(conclusionTexte(fin).length > 20, "conclusion manquante pour " + fin.id);
  }
  assert.equal(ids.size, 4, "les quatre fins doivent être distinctes");
});

test("une salle attribue un poste distinct à chaque participant", () => {
  const s = salleVide();
  rejoindre(s, "a", "Claire");
  rejoindre(s, "b", "Marc");
  rejoindre(s, "c", "Sonia");
  const postes = Object.values(s.participants).map((p) => p.poste);
  assert.equal(new Set(postes).size, 3);
});

test("au delà de douze participants, les postes passent en équipe", () => {
  const s = salleVide();
  for (let i = 0; i < 13; i++) rejoindre(s, "p" + i, "Nom" + i);
  const dernier = s.participants["p12"].poste;
  assert.match(dernier, /équipe 2/);
});

test("un vote se remplace et ne compte jamais deux fois", () => {
  const s = salleVide();
  commander(s, "open", { step: 0 }, scenario, physics);
  voter(s, "a", 1);
  voter(s, "a", 2);
  assert.equal(s.votes[1], undefined);
  assert.equal(s.votes[2], 1);
  assert.equal(majorite(s), 2);
});

test("les votes sont refusés hors phase de vote", () => {
  const s = salleVide();
  assert.equal(voter(s, "a", 1), false);
  commander(s, "open", { step: 0 }, scenario, physics);
  commander(s, "close", {}, scenario, physics);
  assert.equal(voter(s, "a", 1), false);
});

test("la salle suit le cycle ouvert, clos, suivant, fin", () => {
  const s = salleVide();
  commander(s, "chapter", { i: 2 }, scenario, physics);
  assert.equal(s.phase, "intro");
  commander(s, "open", { step: 0 }, scenario, physics);
  assert.equal(s.phase, "vote");
  commander(s, "close", {}, scenario, physics);
  assert.equal(s.phase, "reveal");
  for (let i = 0; i < 7; i++) commander(s, "next", {}, scenario, physics);
  assert.equal(s.phase, "end");
});

test("la réinitialisation remet tout à zéro", () => {
  const s = salleVide();
  rejoindre(s, "a", "Claire");
  commander(s, "open", { step: 3 }, scenario, physics);
  commander(s, "reset", {}, scenario, physics);
  assert.equal(s.phase, "lobby");
  assert.equal(s.step, -1);
  assert.deepEqual(s.votes, {});
});

test("la simulation branchée sur la salle avance selon la majorité", () => {
  const s = salleVide();
  demarrerSimulation(s, physics, scenario);
  commander(s, "open", { step: 0 }, scenario, physics);
  voter(s, "a", 2);
  voter(s, "b", 2);
  const choix = appliquerMajorite(s, scenario, physics);
  assert.equal(choix, 2);
  assert.equal(s.sim.state.step, 1);
  assert.ok(s.sim.state.leak.mass > 0, "la fuite doit avoir commencé");
});

test("l'état public ne divulgue pas les structures internes du moteur", () => {
  const s = salleVide();
  demarrerSimulation(s, physics, scenario);
  rejoindre(s, "a", "Claire");
  commander(s, "open", { step: 0 }, scenario, physics);
  voter(s, "a", 2);
  appliquerMajorite(s, scenario, physics);
  const pub = etatPublic(s, physics);
  assert.ok(pub.crise && pub.tension);
  assert.equal(pub.sim, undefined);
  assert.equal(pub.participants, 1);
  assert.equal(pub.total, 1);
});
