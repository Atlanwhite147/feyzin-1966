import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { newGame, jouer, resume, evaluateEnding, pressureFor, heureDe } from "../src/engine/index.js";

const ici = path.dirname(fileURLToPath(import.meta.url));
const racine = path.join(ici, "..");
const physics = JSON.parse(fs.readFileSync(path.join(racine, "src/data/physics.json"), "utf8"));
const scenario = JSON.parse(fs.readFileSync(path.join(racine, "src/data/scenario.json"), "utf8"));

function partie(choix) {
  let g = newGame(physics, scenario);
  for (const c of choix) {
    g = { ...g, ...jouer(g, c) };
    if (g.terminee) break;
  }
  return { etat: g.state, fin: g.fin || evaluateEnding(g.state, g.physics) };
}

test("le scénario expose sept étapes de trois options", () => {
  assert.equal(scenario.etapes.length, 7);
  for (const e of scenario.etapes) assert.equal(e.options.length, 3);
});

test("une même suite de choix donne exactement le même état", () => {
  const a = partie([2, 0, 0, 0, 0, 0, 0]);
  const b = partie([2, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(a.etat, b.etat);
  assert.deepEqual(a.fin, b.fin);
});

test("le contenu de départ n'est jamais modifié par la simulation", () => {
  const copie = JSON.stringify(physics);
  partie([2, 0, 0, 0, 0, 0, 0]);
  assert.equal(JSON.stringify(physics), copie);
});

test("purge conforme à chaque étape : maîtrise, aucune rupture, aucun mort", () => {
  const { fin } = partie([0, 0, 0, 0, 0, 0, 0]);
  assert.equal(fin.id, "maitrise");
  assert.equal(fin.ruptures, 0);
  assert.equal(fin.morts, 0);
});

test("purge bâclée puis bonnes décisions : BLEVE contenu, bilan limité", () => {
  const { etat, fin } = partie([2, 0, 0, 0, 0, 0, 0]);
  assert.equal(fin.id, "bleve-contenu");
  assert.equal(fin.ruptures, 1);
  assert.ok(fin.morts <= 3, "bilan humain minimal attendu, obtenu " + fin.morts);
  assert.ok(etat.perimeter.evacuated, "le périmètre doit être évacué");
});

test("la rupture survient autour de 08 h 40, pas au début de la matinée", () => {
  const { etat } = partie([2, 0, 0, 0, 0, 0, 0]);
  assert.ok(etat.ruptureContext, "la rupture doit laisser une trace");
  const heure = etat.ruptureContext.heure;
  assert.ok(["08 h 35", "08 h 40", "08 h 45", "08 h 50"].includes(heure), "heure de rupture : " + heure);
});

test("sans refroidissement des sphères, la réaction en chaîne emporte les voisines", () => {
  const { fin } = partie([2, 1, 1, 1, 1, 0, 0]);
  assert.equal(fin.id, "chaine");
  assert.equal(fin.ruptures, 3);
  assert.ok(fin.morts > 18, "le bilan dépasse le scénario historique");
});

test("secours maintenus à 150 m sans évacuation : scénario historique", () => {
  const { fin } = partie([2, 0, 0, 0, 1, 0, 0]);
  assert.equal(fin.id, "historique");
  assert.equal(fin.morts, 18);
  assert.equal(fin.blesses, 84);
});

test("l'inflammation seule ne suffit pas : il faut une fuite encore active", () => {
  const { etat, fin } = partie([0, 0, 0, 0, 0, 0, 0]);
  assert.equal(etat.fire.active, false);
  assert.equal(fin.id, "maitrise");
});

test("la pression suit la température de paroi", () => {
  const froid = pressureFor(12, physics);
  const chaud = pressureFor(40, physics);
  assert.ok(chaud > froid, "la pression doit croître avec la température");
  const pRupture = pressureFor(physics.sphere443.temperatureRupture, physics);
  assert.ok(pRupture >= physics.sphere443.pressionRupture - 2, "pression à la température de rupture : " + pRupture);
});

test("le résumé expose les grandeurs utiles à l'écran de salle", () => {
  let g = newGame(physics, scenario);
  g = { ...g, ...jouer(g, 2) };
  const r = resume(g);
  assert.equal(typeof r.pression443, "number");
  assert.equal(typeof r.eau, "number");
  assert.ok(r.nappe.masse > 0, "le nuage doit avoir une masse après la fuite");
  assert.equal(r.heure, "06 h 41");
});

test("l'horloge de la simulation démarre à 06 h 30", () => {
  assert.equal(heureDe(0), "06 h 30");
  assert.equal(heureDe(45), "07 h 15");
});

test("toute option produit une fin cohérente, jamais indéfinie", () => {
  const idsValides = new Set(["maitrise", "bleve-contenu", "historique", "chaine"]);
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++)
      for (let c = 0; c < 3; c++) {
        const { fin } = partie([a, b, c, 0, 0, 0, 0]);
        assert.ok(idsValides.has(fin.id), "fin inattendue : " + fin.id);
        assert.ok(fin.morts >= 0 && fin.blesses >= fin.morts, "bilan incohérent");
      }
});
