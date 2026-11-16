import fs from "node:fs";
import { refineryMap } from "../src/views/map.js";
const sol = (s) => ({ spheres:[{id:"443",wall:s.w,ruptured:s.r},{id:"442",wall:22,ruptured:false},{id:"441",wall:12,ruptured:false}],
  nappe:{masse:s.m,rayon:s.ray,derive:s.der}, eau:{stock:s.eau,epuisee:s.eau===0},
  perimetre:{radius:s.per,evacuated:s.evac}, a7:{closed:s.a7c}, secours:{distance:s.sec,withdrawn:s.repli} });
const cas = [
  ["initial", sol({w:12,r:false,m:0,ray:0,der:0,eau:100,per:0,evac:false,a7c:false,sec:250,repli:false})],
  ["crise",   sol({w:34,r:false,m:8000,ray:95,der:120,eau:42,per:250,evac:true,a7c:true,sec:300,repli:true})],
  ["rupture", sol({w:62,r:true, m:12000,ray:140,der:180,eau:0,per:120,evac:false,a7c:false,sec:80,repli:false})]
];
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#08080a;font-family:Helvetica">
${cas.map(([n,e])=>`<div style="padding:6px 12px;color:#948d83;font-size:12px;letter-spacing:2px">${n.toUpperCase()}</div><div style="width:900px;margin:0 0 10px 12px;border:1px solid #2b2b30">${refineryMap(e)}</div>`).join("")}
</body>`;
fs.writeFileSync("/home/alban/.hermes/cache/scratch/apercu-plan.html", html);
console.log("ok");
