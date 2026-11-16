# Feyzin 1966 — salle de vote en direct

Application Cloudflare Workers + Durable Objects. Une salle par code à 4 lettres : l'écran de salle
projette, les participants votent depuis leur téléphone, l'histoire bifurque selon la majorité.

## Hébergement recommandé : Cloudflare Workers (offre gratuite)

Pourquoi : pas de serveur à maintenir, WebSocket natif, pas de mise en veille, HTTPS et URL publique
immédiats, Durable Objects inclus dans le plan gratuit. Aucune carte bancaire.

### Déploiement (une fois)

    npx wrangler@4 login          # ouvre le navigateur, compte Cloudflare gratuit suffit
    npx wrangler@4 deploy         # depuis ce dossier

Résultat : une URL du type `https://feyzin-1966.<votre-sous-domaine>.workers.dev`.
Pour un déploiement ultérieur après modification : relancer `npx wrangler@4 deploy`.

Domaine à vous : ajouter dans `wrangler.toml`

    routes = [{ pattern = "feyzin.votredomaine.fr", custom_domain = true }]

### Test local (sans compte)

    npx wrangler@4 dev --port 8787
    # salle : http://localhost:8787/?room=ABCD
    # participants : http://localhost:8787/p/ABCD

## En séance

1. Ouvrir `https://…workers.dev/?room=ABCD` (code libre, 4 lettres) sur l'écran projeté.
2. Les participants ouvrent `https://…workers.dev/p/ABCD` sur leur téléphone.
3. « Ouvrir l'étape 1 » : la question s'affiche des deux côtés, les barres bougent en direct.
4. « Clore le vote » : la majorité s'affiche, la branche correspondante s'ouvre, le rappel du réel suit.
5. « Étape suivante » pour enchaîner, jusqu'aux conclusions.

Le vote peut être changé tant qu'il est ouvert. Un votant = un identifiant de navigateur.
L'état de la salle est conservé dans le Durable Object : une coupure réseau ne perd pas la session.

## Structure

- `src/index.js` : Worker, Durable Object `Room`, routes, HTML des deux écrans, contenu du jeu (STEPS).
- `wrangler.toml` : binding `ROOMS`, migration SQLite.

## Sources du contenu

Fiche ARIA n°1, ministère chargé de l'environnement, « BLEVE dans un dépôt de GPL en raffinerie,
Feyzin, 4 janvier 1966 », septembre 2006 ; rapports cités : experts judiciaires, DHYCA 19/01/1966,
service des mines de l'Isère n°05460 du 02/01/1967. Les branches « ce qui aurait pu se passer »
sont des récits contrefactuels signalés comme tels dans l'interface.
