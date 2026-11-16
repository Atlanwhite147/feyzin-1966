/* Génère src/data/bundle.js à partir des fichiers JSON.
   Les deux exécutants (Node et Worker) lisent ainsi les mêmes données sans import JSON expérimental. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const lire = (nom) => JSON.parse(fs.readFileSync(path.join(racine, "src/data", nom), "utf8"));

const physics = lire("physics.json");
const scenario = lire("scenario.json");
const history = lire("history.json");

const sortie = `/* Fichier généré par scripts/build-data.mjs. Ne pas éditer à la main. */

export const physics = ${JSON.stringify(physics, null, 2)};

export const scenario = ${JSON.stringify(scenario, null, 2)};

export const history = ${JSON.stringify(history, null, 2)};
`;

fs.writeFileSync(path.join(racine, "src/data/bundle.js"), sortie);
console.log("bundle.js écrit : " + sortie.length + " caractères, " + scenario.etapes.length + " étapes");
