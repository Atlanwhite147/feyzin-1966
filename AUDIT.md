# AUDIT — Feyzin 1966

Audit d'entrée, avant toute modification. Établi sur le dépôt `live-worker` (branche `main`, commit `51160e5`).

## 1. Inventaire

| Élément | Contenu |
|---|---|
| `src/content.js` (735 lignes) | Données de jeu **et** gabarits HTML complets des deux écrans, avec CSS et JavaScript embarqués, sous forme de chaînes de caractères. Contient `STEPS` (7 étapes), `INTRO` (3 écrans), `CONCLUSIONS` (6 cartes), `MEDIA`, `ROLES`, `POSTES` (12), `ILLUS` (7 illustrations SVG), `ANIM` (écran de salle), `PART` (écran participant), `BASE_CSS`. |
| `src/index.js` (154 lignes) | Worker Cloudflare : routage `GET /`, `/p/:code`, `/ws`, `/health`, et Durable Object `Room` (état, votes, diffusion, persistance `storage`). |
| `server.js` (169 lignes) | Serveur Node + `ws` pour Render ou poste local : mêmes routes, même machine à états, plus le service de `public/extrait.webm` avec support `Range`. |
| `public/extrait.webm` | Extrait de 42 s du film d'époque (Wikimedia, CC BY-SA 3.0). |
| `wrangler.toml`, `render.yaml`, `package.json`, `README.md` | Déploiement Cloudflare et Render, documentation de séance. |
| `.wrangler/` | Sorties locales du CLI Cloudflare, versionnées par erreur. |
| `captures/` (hors dépôt) | Captures d'écran de contrôle. |

Une seule dépendance de production : `ws`. Aucun outil de build, aucune transpilation : du HTML servi tel quel.

## 2. Ce qui fonctionne et doit être préservé

- **Boucle de séance** : lobby avec code de salle, lien copiable et QR code, prénoms et postes fictifs attribués à l'arrivée, sept étapes votées, révélation par étape, débrief final. Elle tourne, elle a été testée de bout en bout.
- **Temps réel** : WebSocket, barres de vote qui bougent en direct, écran de salle et téléphones synchronisés par l'état public de la salle.
- **Reconnexion** : un participant qui recharge garde son prénom et son vote (`localStorage` + message `you`).
- **Deux cibles d'hébergement** avec le même contenu : Durable Object Cloudflare et serveur Node.
- **Direction artistique** : nuit d'hiver, fond sombre, illustrations SVG au trait, extrait vidéo, texte adressé directement au participant à la deuxième personne.
- **Mise en page adaptative** : mode écran unique au-delà de 980 px de large, défilement normal en dessous, mesuré en 1920×1080, 1366×768, 1280×800 et 390×844.
- **Sobriété technique** : zéro framework, chargement immédiat, aucune API externe hormis le QR code.

## 3. Manques critiques

### 3.1 Gameplay
- **Aucune simulation.** L'étape suivante est choisie par la majorité parmi trois textes fixes, avec un champ `p` (0/1/3) qui sert uniquement à colorer la révélation. Rien ne se propage, rien ne s'additionne, aucune décision n'a de coût différé.
- **Aucune variable d'état physique.** Ni pression, ni température, ni nappe de gaz, ni débit d'eau, ni périmètre. Les conséquences sont racontées, pas calculées.
- **Aucune horloge de crise.** Le temps est décoratif : `h` affiche « 06 h 30 » ou « 08 h 45 » selon l'étape, sans lien avec ce qui s'est passé avant.
- **Une seule fin.** Les conclusions sont les mêmes quelle que soit la partie : six cartes pédagogiques, puis « Nouvelle session ».
- **Brouillard d'information absent.** Toutes les informations sont exactes, simultanées et complètes : aucune remontée contradictoire, aucun capteur muet, aucune incertitude à lever.
- **Les noms et postes ne servent à rien.** Ils sont purement cosmétiques, ce qui est voulu, mais aucune mécanique ne les relie au jeu (qui tient la clé, qui parle à la radio, qui décide).

### 3.2 Interface
- Pas de plan de la raffinerie : les illustrations sont des dessins d'ambiance, pas des instruments.
- Pas de journal radio, pas d'horodatage des événements.
- Pas de retour d'action autre que le texte de la révélation : ni jauge, ni alarme, ni son.
- **Accessibilité** : contrastes passables mais rien sur le focus clavier, pas de `aria-live` pour les votes, boutons sans état désactivé explicite.

### 3.3 Architecture
- **Données, moteur et vue mélangés** : décisions, seuils, textes et HTML dans un seul fichier de 735 lignes.
- **Duplication** : le routage, la machine à états et l'injection de contenu existent deux fois (`index.js` et `server.js`), avec des différences subtiles (persistance, comptage des présents). Toute évolution doit être écrite deux fois.
- **Machine à états pauvre** : `{step, phase, intro, votes, voters, participants}`, sans notion d'événement, sans historique.
- **Aucune séparation testable** : la logique de vote est enfouie dans les gestionnaires WebSocket.
- **Aucun test.** Aucun script de vérification, aucune CI. Chaque modification a été validée à la main dans un navigateur.
- **`.wrangler/` versionné**, artefacts locaux dans l'historique.

### 3.4 Sécurité et robustesse
- Échappement partiel : les prénoms sont filtrés sur `<` et `>` à l'entrée, mais réinjectés par `innerHTML` à la sortie.
- Pas de limitation de débit sur l'ouverture de salle ni sur les messages.
- Pas de purge des salles Node inactives (fuite mémoire lente sur un serveur qui vit).
- Aucun garde-fou si un participant envoie un `vote` avant l'ouverture de l'étape (rejeté, mais silencieux).

## 4. Plan d'intégration des phases 1 à 5 sur la pile existante

Pile conservée : Node 20 + `ws` pour le serveur, Durable Object pour Cloudflare, HTML servi sans build. On ajoute seulement un dossier de tests (`node --test`, aucune dépendance).

Nouvelle arborescence :

```
src/
  data/
    scenario.json      étapes, dilemmes, textes, effets sur l'état
    physics.json       seuils, constantes, courbes (pression, température, nappe)
    endings.json       quatre dénouements et leurs conditions
    glossary.json      notices BLEVE, POI/PPI, réglementation
  engine/
    state.js           état initial, horloge, invariants
    simulate.js        pas de temps déterministe, propagation, BLEVE
    decisions.js       application d'un choix à l'état, coûts
    endings.js         évaluation des conditions de fin
    room.js            machine à états de séance (lobby, vote, reveal, fin)
  views/
    anim.js            écran de salle
    part.js            écran participant
    debrief.js         frise comparative et bilan
    styles.js          CSS partagé
  server/
    node.js            serveur HTTP + WebSocket
    worker.js          Worker Cloudflare + Durable Object
tests/
  engine.test.js       propagation, seuils, BLEVE, fins
  room.test.js         machine à états, votes, reconnexion
```

- **Phase 1** : `scenario.json`, `physics.json`, `engine/state.js`, `engine/simulate.js`, `engine/decisions.js`. L'état porte pression, température, nappe, débit d'eau, périmètre, effectifs exposés. Chaque choix applique des deltas et avance l'horloge. Le vote de salle devient **l'entrée** du moteur : la majorité sélectionne l'action, le moteur calcule la suite.
- **Phase 2** : horloge de crise (temps accéléré, pause tactique), `engine/endings.js` avec quatre fins évaluées sur l'état et non sur un script, écran de débrief avec frise comparative choix joueur / faits réels.
- **Phase 3** : vue « PC Secours » avec plan schématique (cuvettes, sphères, réseau d'eau, A7), journal radio horodaté et coloré, jauges et alarmes progressives, mode muet, raccourcis clavier, responsive vérifié aux quatre résolutions déjà utilisées.
- **Phase 4** : séparation stricte données / moteur / vue, serveur unique factorisé pour Node et Cloudflare, sauvegarde `localStorage`, bilan partageable, suite de tests `node --test` sur le moteur et la machine à états.
- **Phase 5** : équilibrage, accessibilité, passe de relecture historique, documentation.

## 5. Décision d'architecture à trancher

Le dépôt actuel est un **jeu de salle** : tout le monde vote, l'animateur projette. La mission décrit un **poste de commandement** : un joueur, une horloge, des jauges, quatre fins.

Deux façons de tenir les deux :

1. **Recommandée** — le moteur de simulation devient le cœur ; le vote de salle reste la couche de décision. L'animateur projette le PC Secours, la salle vote chaque arbitrage, le moteur calcule les conséquences et l'état évolue entre les votes. On garde la séance collective et on gagne la simulation, les quatre fins et le débrief comparatif.
2. Le jeu devient solo : un seul joueur devant le PC Secours, la couche WebSocket devient optionnelle.

Le reste de l'audit ne dépend pas de ce choix : la séparation données / moteur / vue, les tests et les données historiques sont nécessaires dans les deux cas.


## 6. État après exécution (phases 1 à 5)

| Phase | Livré | Vérification |
|---|---|---|
| 1. Modélisation | `physics.json`, `scenario.json`, moteur `state/simulate/decisions/endings` | 13 tests, rupture projetée à 08 h 40, quatre fins atteignables |
| 2. Tension et fins | projection avant rupture, niveaux de tension, frise comparée, synthèse | 14 tests, chaque fin a sa conclusion |
| 3. Interface | PC Secours : plan SVG, quatre jauges, journal radio, bandeau de tension, alarme sonore coupable, raccourcis clavier, vue participant avec état de crise et résumé copiable | captures 1920×1080 et 390×844, aucun défilement sur grand écran, aucun débordement horizontal sur téléphone |
| 4. Architecture | `engine/room.js` unique, serveurs Node et Cloudflare réduits au transport, `data/bundle.js`, tests d'intégration | 33 tests dont un parcours complet en WebSocket et une compilation des scripts embarqués |
| 5. Équilibrage et documentation | calibration sur la chronologie réelle, `npm run sim`, `npm run check`, README réécrit | `npm test`, `npm run check` verts |

Points restés ouverts :

- La fiche ARIA donne 18 morts et 84 blessés ; le détail par catégorie (personnel, secours, riverains) n'est pas dans le dépôt et n'est donc pas inventé.
- Deux dates de la réglementation sont marquées « à confirmer » dans `history.json` faute de source vérifiée.
- Le mode solo n'a pas été développé : la salle reste la couche de décision, comme arbitré en phase 1.
