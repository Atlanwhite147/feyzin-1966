import vm from "node:vm";
import { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, POSTES, ILLUS, ANIM, PART } from "../src/content.js";

const inject = (tpl) => tpl
  .replace("__STEPS__", JSON.stringify(STEPS)).replace("__INTRO__", JSON.stringify(INTRO))
  .replace("__MEDIA__", JSON.stringify(MEDIA)).replace("__ROLES__", JSON.stringify(ROLES))
  .replace("__ILLUS__", JSON.stringify(ILLUS)).replace("__POSTES__", JSON.stringify(POSTES))
  .replace("__FILM__", "/extrait.webm").replace("__CONC__", JSON.stringify(CONCLUSIONS))
  .replace("__HIST__", "{}").replace("__MAP__", "function refineryMap(){return ''}");

const pages = [
  ["ANIM", inject(ANIM)],
  ["PART", inject(PART).split("__CODE__").join("ABCD")]
];

let ko = 0;
for (const [nom, html] of pages) {
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    const code = m[1];
    try { new vm.Script(code); console.log(nom, "script ok"); }
    catch (e) {
      ko++;
      console.log(nom, "ERREUR:", e.message);
      const ligne = Number((e.stack.match(/:(\d+)/) || [])[1]);
      const l = code.split("\n");
      for (let i = Math.max(0, ligne - 3); i < Math.min(l.length, ligne + 2); i++) console.log("  " + (i + 1) + ": " + l[i]);
    }
  }
}
process.exit(ko ? 1 : 0);
