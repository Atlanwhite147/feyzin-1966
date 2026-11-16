# Feyzin 1966 — récit interactif avec vote en direct

Application web pour une salle : un écran projeté, des participants qui votent depuis leur PC ou leur
téléphone, et une histoire qui bifurque selon la majorité. Prologue narratif, sept scènes, archives d'époque.

- Écran de salle : `https://…/?room=CODE`
- Participants : `https://…/p/CODE`

## Hébergement

### Render (offre gratuite, instance qui s'endort)

`render.yaml` fourni. Créer le service depuis ce dépôt GitHub, plan Free, build `npm install`,
start `npm start`. Le service s'endort après quinze minutes sans visite : ouvrir l'adresse deux minutes
avant la séance, recharger si besoin.

### Cloudflare Workers (offre gratuite, sans mise en veille)

`npx wrangler@4 login` puis `npx wrangler@4 deploy`. Worker et Durable Object dans `src/index.js`,
contenu et gabarits dans `src/content.js`. Aucune carte bancaire.

### Test local

    npm install
    npm start                        # http://localhost:8787

## Déroulé de séance

1. Prologue de six écrans : le décor, votre rôle, ce qui va se jouer, les règles, les quatre mots, puis
   les images d'époque (film de 1966, quatre minutes).
2. Les participants rejoignent `/p/CODE` : aucun compte, rien à installer.
3. À chaque scène : la situation, le rôle collectif (« dans cette scène, vous êtes l'aide-opérateur »),
   trois décisions, le vote en direct.
4. Clôture : la majorité s'affiche, sa branche s'ouvre, puis le rappel de ce qui s'est réellement passé.
5. Fin : cinq conclusions, ce que la réglementation en a fait, transposition à aujourd'hui.

Le vote peut être changé tant qu'il est ouvert. Un votant = un identifiant de navigateur, retrouvé au
rechargement. La salle garde son état : une coupure réseau ne perd pas la session.
Raccourcis écran de salle : flèches gauche/droite, R pour réinitialiser.

## Structure

- `src/index.js` : Worker, Durable Object `Room`, routes et WebSocket.
- `src/content.js` : contenu du jeu (`STEPS`, `INTRO`, `MEDIA`, `ROLES`, `CONCLUSIONS`) et gabarits des deux écrans.
- `server.js` : serveur Node (une dépendance, `ws`) pour Render ou tout hébergeur Node.
- `wrangler.toml` : binding `ROOMS`, migration SQLite.

## Sources

Chronologie, chiffres et enseignements : fiche ARIA n°1, ministère chargé de l'environnement,
« BLEVE dans un dépôt de GPL en raffinerie, Feyzin, 4 janvier 1966 », septembre 2006.
Rapports cités par cette fiche : experts judiciaires, DHYCA du 19 janvier 1966,
service des mines de l'Isère n°05460 du 2 janvier 1967.

Archives visuelles (Wikimedia Commons) :

- Film « Accident Feyzin », Jean Sivignon, CC BY-SA 3.0, page `File:Accident_Feyzin.ogv`,
  lu via le transcode WebM 480p de Wikimedia.
- « Feyzin - Autoroute A7 - Vue sur la raffinerie de Feyzin 01 », Romainbehar, CC0.
- « Oil refinery smoke over Lyon and Fourvière », Radiokafka, CC BY-SA 4.0.
- « Vienne - Cimetière du Pipet, monument accident raffinerie Feyzin 1 », Sebleouf, CC BY-SA 4.0.

Les branches « ce qui aurait pu se passer » sont des récits contrefactuels explicitement signalés comme tels.
