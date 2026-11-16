# Feyzin 1966 — récit interactif avec vote en direct

Application web pour une salle : un écran projeté, des gens qui votent depuis leur PC ou leur téléphone,
et une histoire qui bifurque selon la majorité. Ambiance sombre, prologue court, illustrations originales,
archives d'époque.

- Écran de salle : `https://…/?room=CODE` (code de 4 à 8 lettres ou chiffres)
- Participants : `https://…/p/CODE`

## Hébergement

### Render (offre gratuite, instance qui s'endort)

`render.yaml` fourni. Créer le service depuis ce dépôt GitHub, plan Free, build `npm install`,
start `npm start`. Le service s'endort après quinze minutes sans visite : ouvrir l'adresse deux minutes
avant la séance.

### Cloudflare Workers (offre gratuite, sans mise en veille)

`npx wrangler@4 login` puis `npx wrangler@4 deploy`. Le Worker lit le film directement sur Wikimedia
(le fichier local `public/extrait.webm` n'est servi que par la version Node).

### Test local

    npm install
    npm start                        # http://localhost:8787

## Déroulé de séance

1. Trois écrans de prologue, une minute : la nuit du 4 janvier (photo de nuit, en décembre), votre rôle,
   puis quarante secondes d'archives. Ambiance sombre, grain, vignette qui respire, apparitions successives.
2. Chacun rejoint `/p/CODE` : aucun compte, rien à installer.
3. Sept scènes : une illustration, la situation, le rôle collectif (« dans cette scène, vous êtes… »),
   trois décisions, le vote en direct.
4. Clôture : la majorité s'affiche, sa branche s'ouvre, puis le rappel de ce qui s'est réellement passé.
5. Fin : six conclusions écrites pour un service du nucléaire (défense en profondeur, hors-dimensionnement,
   interfaces, facteurs organisationnels, retour d'expérience), ce que la réglementation en a fait,
   et trois questions à se poser en rentrant. Si la salle choisit la branche qui a conduit à l'accident,
   la carte du réel s'allume en rouge et une ligne d'alerte pulse en haut de l'écran.

Le vote peut être changé tant qu'il est ouvert. Un votant = un identifiant de navigateur, retrouvé au
rechargement. La salle garde son état. Raccourcis écran de salle : flèches gauche/droite, R pour réinitialiser.

## Structure

- `src/index.js` : Worker, Durable Object `Room`, routes et WebSocket.
- `src/content.js` : contenu (`STEPS`, `INTRO`, `MEDIA`, `ROLES`, `ILLUS`, `CONCLUSIONS`) et gabarits des écrans.
- `server.js` : serveur Node (une dépendance, `ws`), avec support des requêtes Range pour la vidéo.
- `public/extrait.webm` : extrait de 42 secondes du film de 1966, servi par la version Node.
- `wrangler.toml` : binding `ROOMS`, migration SQLite.

## Sources

Chronologie, chiffres et enseignements : fiche ARIA n°1, ministère chargé de l'environnement,
« BLEVE dans un dépôt de GPL en raffinerie, Feyzin, 4 janvier 1966 », septembre 2006.
Rapports cités par cette fiche : experts judiciaires, DHYCA du 19 janvier 1966,
service des mines de l'Isère n°05460 du 2 janvier 1967.

Archives visuelles :

- Film « Accident Feyzin », Jean Sivignon, CC BY-SA 3.0, Wikimedia Commons (`File:Accident_Feyzin.ogv`),
  dont est tiré l'extrait de 42 secondes.
- « Feyzin Zone activité », Frachet, CC BY-SA 3.0 : la raffinerie vue de nuit, en décembre.
- « Oil refinery smoke over Lyon and Fourvière », Radiokafka, CC BY-SA 4.0.

Les sept illustrations de scène sont des dessins vectoriels originaux créés pour ce jeu.
Les branches « ce qui aurait pu se passer » sont des récits contrefactuels explicitement signalés comme tels.
