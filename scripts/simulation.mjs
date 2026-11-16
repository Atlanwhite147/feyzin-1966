/* Ligne de commande de mise au point : joue une suite de choix et affiche la chronologie.
   Usage : node scripts/simulation.mjs 2,0,0,0,0,0,0   (chiffres = index de l'option, 0 = A) */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { newGame, jouer, resume, evaluateEnding, heureDe } from "../src/engine/index.js";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const physics = JSON.parse(fs.readFileSync(path.join(racine, "src/data/physics.json"), "utf8"));
const scenario = JSON.parse(fs.readFileSync(path.join(racine, "src/data/scenario.json"), "utf8"));

const arg = process.argv[2] || "0,0,0,0,0,0,0";
const choix = arg.split(",").map((x) => Number(x.trim()));

let g = newGame(physics, scenario);
for (const c of choix) {
  const etape = scenario.etapes[g.state.step];
  if (!etape) break;
  console.log(`\n${etape.heure} — ${etape.titre} → ${"ABC"[c]} : ${etape.options[c].texte.slice(0, 70)}`);
  g = { ...g, ...jouer(g, c) };
  const r = resume(g);
  console.log(
    `   ${r.heure} · paroi ${r.temperature443 ?? "—"} °C · pression ${r.pression443 ?? "—"} bar` +
      ` · nappe ${r.nappe.masse} kg / ${r.nappe.rayon} m · eau ${r.eau} %` +
      ` · périmètre ${r.perimetre} m · secours ${r.secours} m · ruptures ${r.ruptures}`
  );
  if (g.terminee) break;
}

const fin = g.fin || evaluateEnding(g.state, g.physics);
console.log(`\nFIN : ${fin.titre} — ${fin.morts} morts, ${fin.blesses} blessés.`);
console.log(fin.resume);
console.log("Barrières tenues : " + fin.tenues + "/" + fin.total);
for (const b of fin.barrières) console.log(`  ${b.tenu ? "[tenue]" : "[rompue]"} ${b.nom}`);

console.log("\nJournal :");
for (const l of g.state.log) console.log(`  ${l.h} [${l.level}] ${l.text}`);
