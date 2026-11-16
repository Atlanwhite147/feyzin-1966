import fs from "node:fs";
import { refineryMap } from "../src/views/map.js";

const etats = [
  { nom: "initial", etat: {} },
  { nom: "crise", etat: {
      spheres: [{id:"443",wall:34,ruptured:false},{id:"442",wall:18,ruptured:false},{id:"441",wall:12,ruptured:false}],
      nappe: { masse: 8000, rayon: 95, derive: 120 },
      eau: { stock: 42, epuisee: false },
      perimetre: { radius: 250, evacuated: true },
      a7: { closed: true },
      secours: { distance: 300, withdrawn: true } } },
  { nom: "rupture", etat: {
      spheres: [{id:"443",wall:62,ruptured:true},{id:"442",wall:44,ruptured:false},{id:"441",wall:12,ruptured:false}],
      nappe: { masse: 12000, rayon: 140, derive: 180 },
      eau: { stock: 0, epuisee: true },
      perimetre: { radius: 120, evacuated: false },
      a7: { closed: false },
      secours: { distance: 80, withdrawn: false } } }
];

let ok = true;
for (const { nom, etat } of etats) {
  const svg = refineryMap(etat);
  for (const mauvais of ["undefined", "NaN", "null"]) {
    if (svg.includes(mauvais)) { console.log("  " + nom + " : contient " + mauvais); ok = false; }
  }
  fs.writeFileSync("/home/alban/.hermes/cache/scratch/plan-" + nom + ".svg", svg);
  console.log("  " + nom + " : " + svg.length + " caracteres");
}
console.log(ok ? "PLAN OK" : "PLAN A CORRIGER");
