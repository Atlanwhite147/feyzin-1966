import { PART } from "../src/content.js";
const i = PART.indexOf("const texte = 'Feyzin 1966");
const extrait = PART.slice(i, i + 160);
console.log(JSON.stringify(extrait));
