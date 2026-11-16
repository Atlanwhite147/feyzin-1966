# Feyzin 1966 — simulation de crise avec vote en direct

Application web pour une salle : un écran projeté en « PC Secours », des gens qui votent depuis leur
téléphone, et une crise qui évolue réellement selon la majorité. Le moteur est déterministe : pression,
température de paroi, nappe de gaz, réserve d'eau, périmètre, secours. Rien n'est joué au hasard.

- Écran de salle : `https://…/?room=CODE` (code de 4 à 8 lettres ou chiffres)
- Participants : `https://…/p/CODE`

## Ce que fait le jeu

1. **Prologue** : trois écrans, une minute, puis quarante secondes d'archives.
2. **Arrivée** : chacun saisit son prénom, reçoit un poste fictif, et son nom apparaît dans l'histoire.
3. **Sept décisions** : la salle vote, la majorité devient l'action du moteur, et la simulation avance
   jusqu'à l'heure de l'étape suivante en calculant les conséquences.
4. **PC Secours** : plan schématique du site (sphères, cuvette, A7, réseau d'eau, périmètre, secours),
   quatre jauges, journal radio horodaté, projection du temps restant avant rupture.
5. **Quatre fins** calculées sur l'état : maîtrise précoce, BLEVE contenu, scénario historique,
   réaction en chaîne.
6. **Débrief** : frise des sept décisions confrontées au déroulement réel, barrières tenues ou rompues,
   bilan humain, ce que la réglementation en a fait. Le participant peut copier son résumé.

Raccourcis sur l'écran de salle : `C` clore le vote, `N` étape suivante, `R` réouvrir, `M` couper le son,
`?` afficher l'aide. Alarmes sonores coupables et mémorisées.

## Architecture

```
src/data/physics.json      constantes du modèle (seuils, chauffe, réserve d'eau, bilans)
src/data/scenario.json     sept étapes, options, effets sur l'état, textes, faits réels
src/data/history.json      frise comparée, glossaire, réglementation, sources
src/data/bundle.js         généré : les trois JSON réunis pour les deux exécutants
src/engine/state.js        état initial, horloge, formatage des heures
src/engine/simulate.js     pas de temps d'une minute : fuite, nappe, incendie, thermique, ruptures
src/engine/decisions.js    application d'un choix, avancement jusqu'à l'étape suivante
src/engine/endings.js      évaluation des quatre fins et des barrières
src/engine/clock.js        projection avant rupture, niveaux de tension
src/engine/debrief.js      frise, synthèse, conclusion
src/engine/room.js         machine à états de salle, partagée par Node et Cloudflare
src/views/map.js           plan schématique en SVG
src/content.js             contenu éditorial et gabarits des deux écrans
src/index.js               Worker Cloudflare + Durable Object
server.js                  serveur Node (une dépendance : ws) + service vidéo avec Range
tests/                     moteur, salle, serveur et parcours complet en WebSocket
```

Le moteur et la machine à états ne connaissent ni le réseau ni le stockage : ce sont des fonctions pures,
testées. Les deux serveurs ne font que du transport.

## Modifier le contenu

1. Éditer les JSON dans `src/data/`.
2. Régénérer le bundle : `npm run data`.
3. Vérifier : `npm test`.

`npm run sim 2,0,0,0,0,0,0` rejoue une suite de choix en ligne de commande et affiche la chronologie,
les jauges et la fin obtenue. `node scripts/verifier-fins.mjs` liste les combinaisons qui donnent
chacune des quatre fins.

## Tests

    npm install
    npm test        # 33 tests : moteur, déterminisme, salle, serveur, parcours complet

Les tests du serveur démarrent une instance réelle sur un port libre, se connectent en WebSocket,
votent depuis quatre participants et vérifient que la crise, la tension et le débrief arrivent bien
sur l'écran de salle. Un test compile les scripts embarqués des deux pages pour attraper les erreurs
de syntaxe avant la séance.

## Hébergement

### Render (offre gratuite, instance qui s'endort)

`render.yaml` fourni. Créer le service depuis ce dépôt, plan Free, build `npm install`, start `npm start`.
Le service s'endort après quinze minutes sans visite : ouvrir l'adresse deux minutes avant la séance.

### Cloudflare Workers (offre gratuite, sans mise en veille)

`npx wrangler@4 login` puis `npx wrangler@4 deploy`. Le Worker lit le film directement sur Wikimedia
(le fichier local `public/extrait.webm` n'est servi que par la version Node).

### Test local

    npm install
    npm start        # http://localhost:8787

## Déroulé de séance

1. Ouvrir l'écran de salle, vérifier que le QR code s'affiche, projeter.
2. Laisser entrer, lire les trois écrans de prologue à voix haute.
3. Pour chaque scène : lire la situation, laisser voter trente à soixante secondes, clore, commenter
   la révélation et la leçon de sûreté.
4. Terminer sur le débrief : la frise dit ce que la salle a fait de différent, le bilan dit ce que cela
   a coûté.

## Sources

Chronologie, chiffres et enseignements : fiche ARIA n°1, ministère chargé de l'environnement,
« BLEVE dans un dépôt de GPL en raffinerie, Feyzin, 4 janvier 1966 », septembre 2006.
Rapports cités par cette fiche : experts judiciaires, DHYCA du 19 janvier 1966,
service des mines de l'Isère n°05460 du 2 janvier 1967.

Archives visuelles :

- Film « Accident Feyzin », Jean Sivignon, CC BY-SA 3.0, Wikimedia Commons (`File:Accident_Feyzin.ogv`),
  dont est tiré l'extrait de 42 secondes.
- « Feyzin Zone activité », Frachet, CC BY-SA 3.0 : la raffinerie vue de nuit, en décembre.
- « Oil refinery smoke over Lyon et Fourvière », Radiokafka, CC BY-SA 4.0.

Les sept illustrations de scène et le plan du site sont des dessins vectoriels originaux.
