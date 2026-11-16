import fs from "node:fs";
import { newGame, jouer, evaluateEnding } from "../src/engine/index.js";
const physics = JSON.parse(fs.readFileSync(new URL("../src/data/physics.json", import.meta.url),"utf8"));
const scenario = JSON.parse(fs.readFileSync(new URL("../src/data/scenario.json", import.meta.url),"utf8"));
const combos = { "toujours A":[0,0,0,0,0,0,0], "C puis A":[2,0,0,0,0,0,0], "C puis B":[2,1,1,1,1,0,0],
  "historique":[2,0,0,0,1,0,0], "appat eau":[2,0,1,1,0,1,0], "A puis B":[0,1,1,1,1,1,1] };
for (const [k,c] of Object.entries(combos)) {
  let g = newGame(physics, scenario);
  for (const x of c) { g = { ...g, ...jouer(g, x) }; if (g.terminee) break; }
  const f = g.fin || evaluateEnding(g.state, g.physics);
  console.log(k.padEnd(12), f.id.padEnd(13), "morts", String(f.morts).padStart(3), "rupt", g.state.ruptures, "t", g.state.clock);
}
