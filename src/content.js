/* Contenu du jeu et gabarits d'écran, partagés par le Worker Cloudflare et le serveur Node. */

const STEPS = [
  {
    t: "La purge", h: "06 h 30",
    s: "La sphère 443 est en remplissage. Il faut prélever un échantillon du produit pour analyse, et pour cela purger la ligne du bas. Les trois prises latérales givrent souvent : on passe par la prise inférieure, entre deux vannes de purge de 50 mm en série, commandées à la clé à carré. Il fait nuit, l'éclairage est réduit.",
    q: "Comment engagez-vous la purge ?",
    o: [
      { txt: "Arrêter la coulée, mettre la sphère en sécurité, purger selon un mode opératoire écrit avec un outil adapté.", p: 3,
        br: "La purge se fait vanne par vanne, la clé est solidaire du carré, le visage protégé. Un peu de gaz s'échappe, l'échantillon est prélevé à 6 h 55. À 7 heures, la sphère reprend son remplissage. Personne ne saura jamais qu'une purge banale avait failli tout emporter." },
      { txt: "Faire la purge comme d'habitude : petite vanne puis grande, en contrôlant le débit.", p: 1,
        br: "Le givre apparaît, l'écoulement saccade, mais rien ne jaillit. L'échantillon est pris avec cinq minutes de retard. Le rapport de quart ne mentionne rien : la marge tenait à un écrou qui voulait bien tenir." },
      { txt: "Ouvrir largement pour aller plus vite, la purge est une opération banale.", p: 0,
        br: "À 6 h 40, le propane jaillit. En dix minutes le nuage sort du site, à 7 h 15 il s'allume sur l'autoroute, à 8 h 45 la sphère éclate. C'est la branche réelle, celle du 4 janvier 1966." }
    ],
    real: "L'aide-opérateur ouvre la vanne inférieure à moitié puis largement celle du haut. Le propane jaillit, éclabousse son visage, les lunettes sont arrachées. La clé mobile, dont l'écrou n'était pas fixé, a quitté le carré : impossible de refermer, les vannes givrent.",
    l: "Une purge de GPL sous pression n'est jamais banale : mode opératoire écrit, outil solidaire, protection du visage, et pas de purge sous une sphère en remplissage."
  },
  {
    t: "La fuite", h: "06 h 41",
    s: "Le propane sort en continu sous la sphère. Vent quasi nul, température basse, dispersion défavorable. Deux cents tonnes de produit dans la sphère.",
    q: "Que faites-vous dans les premières minutes ?",
    o: [
      { txt: "Couper les sources d'inflammation, arrêter la pomperie, alerter, évacuer, puis ne fermer qu'avec un moyen protégé.", p: 3,
        br: "Les moteurs s'arrêtent, le périmètre est balisé, l'alerte part en interne. Le nuage sort du site mais trouve moins de points chauds qu'en 1966. Il se dissipe au-dessus de l'A7 sans s'enflammer. À 8 heures, il n'y a plus de fuite, et personne n'a été blessé." },
      { txt: "Retourner dans le nuage refermer à la main.", p: 1,
        br: "Deux hommes entrent dans le nuage sans masque, avec une clé qui ne prend pas sur des vannes givrées. Ils ressortent vivants, mais leurs vêtements sont imprégnés de propane. La suite tiendra à un point chaud, quelque part sur l'autoroute." },
      { txt: "Attendre que la pression baisse d'elle-même.", p: 0,
        br: "Le nuage continue de grossir pendant que le site attend. À 7 h 15, une voiture s'arrête dans le nuage et l'allume. Le chalumeau s'installe sous la sphère 443." }
    ],
    real: "Les deux agents renoncent sans refermer la vanne inférieure et donnent l'alerte interne. L'équipe de sécurité tente dix minutes d'interrompre la fuite : vannes givrées, échec. Le nuage sort du site et descend vers l'A7 sur un à un mètre cinquante d'épaisseur.",
    l: "Dans les dix premières minutes, ce qui protège c'est de supprimer les sources d'inflammation et de faire circuler l'alerte, pas de tenter l'impossible au contact."
  },
  {
    t: "Le nuage et l'autoroute", h: "06 h 50",
    s: "Le nuage franchit la limite du site et atteint l'A7 puis le CD4. Un camion vient de le traverser sans l'enflammer. Une dizaine de personnes stationne sur le CD4.",
    q: "Votre priorité, maintenant ?",
    o: [
      { txt: "Couper les deux voies par tous moyens et alerter gendarmerie et préfecture sans attendre.", p: 3,
        br: "Appel immédiat, barrage à 6 h 54, l'A7 fermée dans les deux sens. Le nuage traverse la chaussée vide et se dissipe dans les champs. Le camion de 6 h 50 restera le seul véhicule à être entré : il n'a rien allumé." },
      { txt: "Faire signe aux véhicules et compter sur les gardes.", p: 1,
        br: "Un garde se plante sur la bretelle, bras levés. Une voiture s'arrête à 200 mètres, une autre passe. Dix minutes plus tard, le nuage s'allume sur un pot d'échappement. Le chalumeau s'installe." },
      { txt: "Ne pas couper : le gaz brûlera au contact et le nuage se dissipera.", p: 0,
        br: "La circulation continue. À 7 h 15, une voiture entre dans le nuage à 160 mètres de la sphère. La flamme remonte par bonds vers la raffinerie : c'est la branche réelle." }
    ],
    real: "Poste de garde alerté à 6 h 50, employés qui tentent d'arrêter la circulation. Dix minutes pour joindre la gendarmerie, appel vers 7 h 05. À 7 h 15, une voiture entre dans le nuage malgré le signal d'arrêt d'un garde : le nuage s'allume, la flamme remonte, et le propane s'allume à la source.",
    l: "Couper une voie et prévenir les secours publics sont des actions des toutes premières minutes : un numéro, une astreinte, un exercice."
  },
  {
    t: "Le chalumeau", h: "07 h 15",
    s: "La fuite brûle à la source sous la sphère 443. Les sphères 442 et 463 sont à portée de rayonnement. Moyens du site : camion poudre de 1500 kg, lances mousse, bassin de 12 000 m³, deux motopompes de 400 m³/h.",
    q: "Sur quoi portez-vous l'effort ?",
    o: [
      { txt: "Refroidir les sphères voisines, laisser brûler la fuite, préparer la coupure d'alimentation.", p: 3,
        br: "L'eau part sur les voisines, les 442 et 463 restent sous 60 degrés. La fuite brûle jusqu'à épuisement vers 10 heures. On compte des dégâts, pas des morts : les équipes sont restées à distance et l'incendie n'a pas gagné le parc." },
      { txt: "Éteindre la fuite au plus vite.", p: 1,
        br: "La flamme s'éteint à 7 h 50, le nuage se reforme aussitôt, plus large qu'avant. Il faudra une heure pour le faire brûler proprement, et l'opération aura coûté deux brûlés graves." },
      { txt: "Se rapprocher pour fermer la vanne pendant que ça brûle.", p: 0,
        br: "Deux hommes partent avec une lance et une clé. La chaleur les arrête à quarante mètres. La sphère n'est pas refroidie, la soupape s'ouvre à 7 h 45, la torchère monte à dix mètres." }
    ],
    real: "Tentatives d'extinction infructueuses. Sirène à 7 h 20, pompiers extérieurs alertés à 7 h 19, arrosage des sept autres sphères. Les deux motopompes ne peuvent pas fonctionner en parallèle : débit limité à 400 m³/h. Pompiers de Lyon à 7 h 30, cinquante minutes après la fuite.",
    l: "Éteindre un feu de fuite sans couper l'alimentation, c'est préparer un nouveau nuage. Et les moyens d'eau se dimensionnent sur le scénario réel, pas sur le débit nominal."
  },
  {
    t: "La soupape", h: "07 h 45",
    s: "La soupape de la 443 s'ouvre : torchère de dix mètres. À 8 h 15, les flammes montent à quarante mètres au-dessus d'une sphère qui n'a pas pu être refroidie. Cent cinquante-huit sauveteurs dans un rayon de cent à cent vingt mètres, quinze lances en action.",
    q: "Comment lisez-vous l'ouverture de la soupape ?",
    o: [
      { txt: "Comme un danger immédiat : évacuer à 250 ou 300 mètres, arroser les voisines à distance, amarrage des lances, retrait des personnels.", p: 3,
        br: "L'ordre tombe à 7 h 50. À 8 h 30, il n'y a plus personne à moins de 250 mètres. À 8 h 45, la 443 éclate : une boule de feu de 250 mètres de diamètre passe au-dessus du périmètre vide. Elle ne tue personne." },
      { txt: "Comme une bonne nouvelle : la pression s'évacue, la situation est maîtrisée en deux ou trois heures.", p: 0,
        br: "On amarre les lances et on se replie sur une ligne à cent vingt mètres. À 8 h 45, l'explosion tue tous ceux qui étaient à moins de cinquante mètres, sauf deux pompiers. C'est la branche réelle." },
      { txt: "Continuer d'arroser la 443 avec les moyens sur place.", p: 1,
        br: "L'eau atteint mal la tôle, la vanne d'arrosage est inaccessible depuis une heure. Les équipes restent exposées à quarante mètres, la chaleur les fait reculer par vagues jusqu'à l'explosion." }
    ],
    real: "L'ouverture de la soupape est perçue comme positive : maîtrise attendue en deux à trois heures. Dès 8 h 05, amarrage des lances et repli. À 8 h 45, la 443 explose : boule de feu de près de 250 m de diamètre, plus de 400 m de haut. Tous ceux à moins de 50 m sont tués, sauf deux pompiers.",
    l: "Le BLEVE était totalement inattendu. Une torchère à la soupape signale une montée en pression, donc un risque d'éclatement : on ne s'approche pas, on refroidit à distance, on évacue largement."
  },
  {
    t: "Après l'explosion", h: "08 h 45",
    s: "La 443 n'existe plus, un cratère de 35 m sur 15 s'est creusé sous la 442. Sept sphères et deux cylindres restent, plusieurs ouverts par le souffle. L'incendie gagne les bacs voisins.",
    q: "Quelle conduite adoptez-vous ?",
    o: [
      { txt: "Arrêt d'urgence des unités, évacuation, arrosage à distance des capacités restantes, laisser brûler.", p: 3,
        br: "À 8 h 55 la zone est vide et les unités à l'arrêt. La 442 éclate à 9 h 30 dans un site désert. Les sphères de butane s'ouvrent sans exploser. Le parc est perdu, les équipes sont intactes." },
      { txt: "Poursuivre l'extinction au contact pour sauver le parc.", p: 1,
        br: "Les lances restent en ligne. Deux hommes sont brûlés par le souffle de la 442 à 9 h 30, et le parc brûle quand même : on ne sauve pas une sphère avec une lance." },
      { txt: "Attendre les consignes de la direction.", p: 0,
        br: "Quinze minutes passent. Quand l'ordre d'évacuation arrive, la 442 est déjà sous contrainte et les équipes sont toujours dans le périmètre. Le bilan s'alourdit." }
    ],
    real: "Arrêt d'urgence à 8 h 55, zone B évacuée. La 442 explose vers 9 h 30 sans nouvelle victime. Les trois sphères de butane s'ouvrent sans exploser à 9 h 40, 9 h 50 et 10 h 30. ORSEC déclenché à 10 h 10. Lutte de plus de 24 h.",
    l: "Évacuer et arroser à distance, c'est accepter de perdre des capacités pour ne pas perdre des hommes."
  },
  {
    t: "Le retour d'expérience", h: "Le lendemain",
    s: "Bilan réel : 18 morts dont 11 sapeurs-pompiers, 84 blessés dont 49 hospitalisés, 1 475 habitations touchées hors du site. Quelle mesure unique aurait le plus changé l'issue ?",
    q: "Votre vote de synthèse",
    o: [
      { txt: "L'éloignement : distances d'implantation, éloignement de l'autoroute et des habitations.", p: 2,
        br: "La branche de l'urbanisme : les communes passent au Rhône fin 1967, la réglementation impose des distances aux tiers, et l'autoroute cesse d'être un voisin immédiat." },
      { txt: "La conception : purges repensées, soupapes dimensionnées à l'incendie généralisé, moyens d'eau calculés sur le réel.", p: 2,
        br: "La branche de l'ingénierie : l'arrêté de septembre 1967 réécrit le stockage, les purges, les soupapes et les moyens de lutte, avec effet rétroactif sur l'existant." },
      { txt: "La connaissance : savoir ce qu'est un BLEVE et écrire la doctrine d'intervention qui en découle.", p: 2,
        br: "La branche de la culture : le phénomène entre dans la formation des intervenants, et la doctrine « on ne s'approche pas d'une sphère en feu » devient une évidence." }
    ],
    real: "Aucune des trois réponses n'est fausse. La réglementation de 1967 a traité les deux premières ; la connaissance du phénomène manquait ce matin-là, et ce sont les sauveteurs qui l'ont payée.",
    l: "Un accident n'apprend rien s'il ne change que des textes : les textes et la formation des intervenants doivent avancer ensemble."
  }
];

const MEDIA = {
  film: {
    kind: "video",
    src: "__FILM__",
    page: "https://commons.wikimedia.org/wiki/File:Accident_Feyzin.ogv",
    title: "Quarante secondes, ce matin-là",
    caption: "Extrait du film tourné à Feyzin le 4 janvier 1966.",
    credit: "Jean Sivignon, CC BY-SA 3.0, Wikimedia Commons"
  },
  nuit: {
    kind: "image",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Feyzin_Zone_activit%C3%A9.JPG/1920px-Feyzin_Zone_activit%C3%A9.JPG",
    page: "https://commons.wikimedia.org/wiki/File:Feyzin_Zone_activit%C3%A9.JPG",
    caption: "La raffinerie et l’usine voisine, vues de nuit, en décembre.",
    credit: "Frachet, CC BY-SA 3.0, Wikimedia Commons"
  },
  fumee: {
    kind: "image",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg/1920px-Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg",
    page: "https://commons.wikimedia.org/wiki/File:Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg",
    caption: "La cheminée de la raffinerie, depuis Lyon.",
    credit: "Radiokafka, CC BY-SA 4.0"
  }
};

const ILLUS = ["<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Une sphère de gaz sous pression sur ses pieds, avec sa vanne de purge en bas\"><circle cx=\"400\" cy=\"140\" r=\"96\" stroke=\"#cfc7b8\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"400\" cy=\"140\" r=\"96\" stroke=\"#cfc7b8\" stroke-width=\".5\" fill=\"none\" opacity=\".3\"/><path d=\"M340 225 L316 292 M380 232 L368 292 M420 232 L432 292 M460 225 L484 292\" stroke=\"#cfc7b8\" stroke-width=\"1.4\"/><path d=\"M300 296 L500 296\" stroke=\"#cfc7b8\" stroke-width=\"1.6\"/><path d=\"M392 236 L392 268 M408 236 L408 268\" stroke=\"#b4451f\" stroke-width=\"2\"/><path d=\"M400 268 L400 300\" stroke=\"#b4451f\" stroke-width=\"1.4\" stroke-dasharray=\"3 4\"/><path d=\"M386 300 L414 300\" stroke=\"#b4451f\" stroke-width=\"1.2\"/><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">SPHERE 443 · PROPANE</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Un nuage de gaz au ras du sol, un opérateur qui recule\"><path d=\"M0 268 L800 268\" stroke=\"#cfc7b8\" stroke-width=\"1.4\"/><circle cx=\"150\" cy=\"150\" r=\"62\" stroke=\"#cfc7b8\" stroke-width=\"1.4\" fill=\"none\"/><g opacity=\".5\" fill=\"#cfc7b8\"><ellipse cx=\"300\" cy=\"244\" rx=\"86\" ry=\"24\"/><ellipse cx=\"400\" cy=\"238\" rx=\"96\" ry=\"28\"/><ellipse cx=\"510\" cy=\"246\" rx=\"104\" ry=\"22\"/><ellipse cx=\"620\" cy=\"240\" rx=\"78\" ry=\"20\"/><ellipse cx=\"710\" cy=\"250\" rx=\"60\" ry=\"16\"/></g><g stroke=\"#948d83\" stroke-width=\"1.2\" fill=\"none\" opacity=\".8\"><path d=\"M240 196 L300 196 M300 196 l-10 -5 M300 196 l-10 5\"/><path d=\"M300 176 L360 176 M360 176 l-10 -5 M360 176 l-10 5\"/></g><g stroke=\"#b4451f\" stroke-width=\"1.6\" fill=\"none\"><circle cx=\"212\" cy=\"206\" r=\"9\"/><path d=\"M212 215 L212 246 M212 246 L202 268 M212 246 L222 268 M212 224 L198 232 M212 224 L226 232\"/></g><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">06 H 41 · LE NUAGE SORT DU SITE</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Le nuage traverse l'autoroute, des véhicules s'y engagent\"><path d=\"M0 300 L800 300\" stroke=\"#cfc7b8\" stroke-width=\"1\" opacity=\".4\"/><path d=\"M0 190 L800 210\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M0 250 L800 262\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M20 220 L800 236\" stroke=\"#948d83\" stroke-width=\"1.4\" stroke-dasharray=\"18 16\"/><g opacity=\".45\" fill=\"#cfc7b8\"><ellipse cx=\"250\" cy=\"180\" rx=\"150\" ry=\"30\"/><ellipse cx=\"430\" cy=\"196\" rx=\"170\" ry=\"34\"/><ellipse cx=\"610\" cy=\"186\" rx=\"130\" ry=\"26\"/></g><g stroke=\"#b4451f\" stroke-width=\"1.6\" fill=\"none\"><rect x=\"120\" y=\"258\" width=\"52\" height=\"22\" rx=\"3\"/><rect x=\"330\" y=\"238\" width=\"58\" height=\"24\" rx=\"3\"/><rect x=\"560\" y=\"272\" width=\"48\" height=\"20\" rx=\"3\"/></g><g stroke=\"#cfc7b8\" stroke-width=\"1.4\" fill=\"none\"><path d=\"M60 260 L60 220 M60 220 l-16 26 M60 220 l16 26\"/></g><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">06 H 50 · A7 · UN VÉHICULE À 160 M</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Le gaz brûle sous la sphère comme un chalumeau\"><circle cx=\"360\" cy=\"120\" r=\"78\" stroke=\"#cfc7b8\" stroke-width=\"1.5\" fill=\"none\"/><path d=\"M300 180 L286 262 M330 190 L322 262 M390 190 L398 262 M420 180 L434 262\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M250 266 L470 266\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><g stroke=\"#b4451f\" stroke-width=\"2.4\" fill=\"none\"><path d=\"M360 198 C352 224 366 236 360 262\"/><path d=\"M348 200 C336 222 350 240 344 258\" opacity=\".7\"/><path d=\"M372 200 C384 222 370 240 376 258\" opacity=\".7\"/></g><g stroke=\"#948d83\" stroke-width=\"1.2\" stroke-dasharray=\"2 6\" fill=\"none\"><path d=\"M470 292 C520 270 560 250 620 240\"/></g><g stroke=\"#cfc7b8\" stroke-width=\"1.4\" fill=\"none\"><path d=\"M640 292 L668 268 M668 268 l-14 2 M668 268 l-2 14\"/></g><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">07 H 15 · FEU DE FUITE</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"La soupape crache une torchère au-dessus de la sphère, les secours restent à distance\"><circle cx=\"300\" cy=\"170\" r=\"80\" stroke=\"#cfc7b8\" stroke-width=\"1.5\" fill=\"none\"/><path d=\"M240 238 L226 296 M270 246 L262 296 M330 246 L338 296 M360 238 L374 296\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M190 300 L410 300\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M292 90 L292 62 L308 62 L308 90\" stroke=\"#cfc7b8\" stroke-width=\"1.4\" fill=\"none\"/><g stroke=\"#b4451f\" stroke-width=\"2.6\" fill=\"none\"><path d=\"M300 62 C292 34 308 22 300 4\"/><path d=\"M288 60 C276 36 292 24 284 8\" opacity=\".6\"/><path d=\"M312 60 C324 36 308 24 316 8\" opacity=\".6\"/></g><g stroke=\"#948d83\" stroke-width=\"1.1\" stroke-dasharray=\"4 7\" fill=\"none\"><path d=\"M392 250 L560 250\"/></g><text x=\"470\" y=\"242\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"11\">250 M</text><g stroke=\"#cfc7b8\" stroke-width=\"1.3\" fill=\"none\"><circle cx=\"600\" cy=\"240\" r=\"7\"/><path d=\"M600 247 L600 272 M600 258 L588 264 M600 258 L612 264 M600 272 L592 292 M600 272 L608 292\"/><circle cx=\"646\" cy=\"244\" r=\"7\"/><path d=\"M646 251 L646 276 M646 262 L634 268 M646 262 L658 268 M646 276 L638 296 M646 276 L654 296\"/></g><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">07 H 45 · TORCHÈRE DE DIX MÈTRES</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Après l'explosion, un cratère et des capacités détruites\"><path d=\"M0 280 L800 280\" stroke=\"#cfc7b8\" stroke-width=\"1.2\"/><path d=\"M120 280 C200 236 300 236 380 280\" stroke=\"#cfc7b8\" stroke-width=\"1.4\" fill=\"none\"/><path d=\"M380 280 C420 258 470 258 520 280\" stroke=\"#cfc7b8\" stroke-width=\"1\" opacity=\".6\" fill=\"none\"/><g stroke=\"#cfc7b8\" stroke-width=\"1.3\" fill=\"none\" transform=\"rotate(-14 610 200)\"><circle cx=\"610\" cy=\"200\" r=\"54\"/><path d=\"M576 240 L566 276 M644 240 L654 276\"/></g><path d=\"M596 178 L640 206\" stroke=\"#b4451f\" stroke-width=\"2.2\"/><g stroke=\"#b4451f\" stroke-width=\"1.8\" fill=\"none\"><path d=\"M300 262 C296 244 306 240 302 226\"/><path d=\"M330 264 C326 248 336 244 332 232\" opacity=\".7\"/></g><g fill=\"#948d83\"><circle cx=\"250\" cy=\"250\" r=\"2\"/><circle cx=\"470\" cy=\"252\" r=\"2\"/><circle cx=\"520\" cy=\"246\" r=\"1.6\"/><circle cx=\"700\" cy=\"256\" r=\"2\"/></g><text x=\"24\" y=\"40\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">08 H 45 · BLEVE</text></svg>", "<svg viewBox=\"0 0 800 320\" role=\"img\" aria-label=\"Une page de rapport d'enquête, une ligne soulignée\"><rect x=\"150\" y=\"40\" width=\"500\" height=\"240\" stroke=\"#cfc7b8\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M250 40 L250 280\" stroke=\"#cfc7b8\" stroke-width=\".8\" opacity=\".3\"/><g stroke=\"#948d83\" stroke-width=\"1.1\"><path d=\"M270 74 L610 74 M270 92 L560 92 M270 110 L600 110 M270 146 L580 146 M270 164 L620 164 M270 182 L540 182 M270 218 L600 218 M270 236 L500 236\"/></g><path d=\"M270 128 L470 128\" stroke=\"#b4451f\" stroke-width=\"1.8\"/><circle cx=\"480\" cy=\"128\" r=\"5\" stroke=\"#b4451f\" stroke-width=\"1.6\" fill=\"none\"/><text x=\"160\" y=\"62\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"10\" letter-spacing=\"2\">RAPPORT</text><text x=\"24\" y=\"304\" fill=\"#948d83\" font-family=\"Helvetica,Arial\" font-size=\"12\" letter-spacing=\"3\">CE QUE L'ON EN A TIRÉ</text></svg>"];

const POSTES = [
  "aide-opérateur",
  "chef de quart",
  "agent de sécurité du site",
  "opérateur en salle de contrôle",
  "technicien de maintenance",
  "pompier de Lyon",
  "pompier de Vienne",
  "gardien du poste de garde",
  "ingénieur sûreté",
  "chargé de planification",
  "agent de la cellule de crise",
  "technicien du laboratoire"
];

const ROLES = [
  "l'aide-opérateur qui tient la clé de purge",
  "le chef de quart qui doit décider vite",
  "le garde du poste de garde, seul face à l'autoroute",
  "le chef du service incendie de la raffinerie",
  "le chef de colonne des pompiers de Lyon",
  "le directeur de site, après l'explosion",
  "l'ingénieur qui écrit le retour d'expérience"
];

const INTRO = [
  {
    k: "Feyzin, 4 janvier 1966",
    h: "6 h 30",
    p: [
      "La nuit est encore là. Devant vous, huit sphères d’acier de treize mètres, posées sur leurs pieds, remplies de propane liquide. L’autoroute passe à vingt mètres, un mètre cinquante plus bas.",
      "Vous êtes de quart. Vous ne le savez pas encore, mais dans une heure, ce site ne sera plus le même, et dix-huit personnes ne rentreront pas chez elles."
    ],
    media: "nuit"
  },
  {
    k: "Ce que vous allez faire",
    h: "Vous avez la main",
    p: [
      "Pendant deux heures vingt, sept fois, vous allez devoir décider. Une vanne à ouvrir, un nuage qui descend vers la route, une sphère qui chauffe, des hommes à envoyer au plus près.",
      "Ce que la salle choisit devient la suite. Ensuite, vous verrez ce qu’ils ont fait, eux, ce matin-là, et ce que cela a coûté."
    ]
  },
  {
    k: "Avant d’entrer",
    h: "Quarante secondes",
    p: [
      "Regardez. C’est filmé ici, ce matin-là. Ensuite, on commence."
    ],
    media: "film"
  }
];

const CONCLUSIONS = [
  ["Un geste de maintenance a suffi", "Une purge de prélèvement sur une capacité en pression, un écrou non fixé. Le risque majeur n’est pas entré par la porte du scénario de dimensionnement : il est venu d’une opération que tout le monde savait faire."],
  ["La limite du site n’est pas la limite du danger", "Le nuage a traversé l’autoroute qui longeait les stockages. Une interface mal dimensionnée transforme un incident de site en accident de territoire."],
  ["Il n’y avait pas de défense en profondeur", "Une purge, une vanne, une sphère, puis le parc entier. Aucune redondance sur les barrières, aucun moyen de secours indépendant, aucune doctrine écrite pour le cas extrême."],
  ["Le phénomène inconnu tue les intervenants", "Le BLEVE était totalement inattendu : cent cinquante-huit sauveteurs à cent mètres d’une sphère en feu. La connaissance du phénomène et la doctrine d’intervention sont des barrières de sûreté, pas de la documentation."],
  ["Le retour d’expérience est devenu le droit", "Zones dangereuses, distances d’implantation, soupapes dimensionnées à l’incendie généralisé, plans de secours, application rétroactive : la réglementation de 1967 sort directement de cet accident."],
  ["Ce que cela nous dit, à nous", "Une opération banale peut porter la même énergie qu’un scénario majeur ; les interfaces comptent autant que les équipements ; et la doctrine de crise ne s’improvise pas le jour où elle sert."]
];

/* ---------- Cartes partagées ---------- */
const BASE_CSS = `
  :root{--ink:#e9e4d9;--soft:#948d83;--paper:#08080a;--card:#121214;--line:#2b2b30;--accent:#b4451f;--accent2:#d9774f;--tint:#1a1210;--good:#7fa98c;--warn:#c0a05a;--bad:#c9482f;--sans:"Helvetica Neue",Arial,system-ui,sans-serif}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  html,body{margin:0;background:var(--paper);color:var(--ink)}
  body{background-image:radial-gradient(120% 90% at 50% 0%,#131315 0%,#08080a 62%);background-attachment:fixed}
  body{font-family:Georgia,"Iowan Old Style",serif;line-height:1.55;font-size:17px;min-height:100dvh}
  .wrap{max-width:900px;margin:0 auto;padding:20px 18px 90px}
  @media(min-width:1100px){ .wrap{max-width:1080px;padding:28px 26px 96px} body{font-size:18px} }
  .media{margin:16px 0 0;border:1px solid var(--line);background:#000;overflow:hidden}
  .media img,.media video{display:block;width:100%;height:auto;max-height:52vh;object-fit:cover;background:#111}
  .media figcaption{background:var(--card);color:var(--soft);font-family:var(--sans);font-size:11.5px;padding:8px 11px;border-top:1px solid var(--line)}
  .media .credit{opacity:.75}
  .illus{border:1px solid var(--line);background:#0c0c0e;margin:0 0 14px;overflow:hidden}
  .illus svg{display:block;width:100%;height:auto}
  .illus.compact svg{max-height:38vh;object-fit:contain}
  .moi{font-family:var(--sans);font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin:0 0 8px}
  .moi:before{content:"";display:inline-block;width:6px;height:6px;background:var(--accent);border-radius:50%;margin-right:8px;vertical-align:middle}
  .join{display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap}
  .join .txt{flex:1;min-width:240px}
  .join .qr{background:#fff;padding:7px;line-height:0;border-radius:3px}
  .join .qr img{width:132px;height:132px;display:block}
  .lien{display:flex;gap:8px;margin-top:10px}
  .lien input{flex:1;font-family:var(--sans);font-size:13px;padding:11px 12px;background:#0c0c0e;color:var(--ink);border:1px solid var(--line);border-radius:2px}
  .lien button{white-space:nowrap}
  .roster{font-family:var(--sans);font-size:13.5px;color:#c9c1b4;line-height:1.65;margin:14px 0 0}
  .roster b{color:var(--ink);font-weight:600}
  .role{font-family:var(--sans);font-size:12px;letter-spacing:.05em;color:var(--accent2);
        background:var(--tint);display:inline-block;padding:5px 10px;border-radius:2px;margin:0 0 10px}
  .bar{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--ink);padding-bottom:9px;margin-bottom:20px;gap:10px}
  .brand{font-family:var(--sans);font-size:10px;letter-spacing:.17em;text-transform:uppercase;color:var(--soft)}
  .barright{display:flex;align-items:center;gap:10px}
  .mini{font-family:var(--sans);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);
        background:none;border:1px solid var(--line);padding:4px 8px;cursor:pointer}
  .mini:hover{color:var(--ink);border-color:var(--soft)}
  .clock{font-family:var(--sans);font-size:12.5px;background:var(--accent);color:#fff;padding:4px 9px;border-radius:3px;white-space:nowrap}
  h1{font-size:clamp(26px,5.6vw,42px);line-height:1.07;font-weight:400;margin:0 0 12px}
  h1 em{font-style:normal;color:var(--accent)}
  h2{font-size:clamp(18px,4vw,24px);font-weight:400;margin:0 0 12px}
  h3{font-family:var(--sans);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);margin:20px 0 8px;font-weight:700}
  p{margin:0 0 12px}
  .kicker{font-family:var(--sans);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
  .card{background:var(--card);border:1px solid var(--line);border-left:3px solid var(--accent);padding:16px;margin-bottom:14px}
  .card.plain{border-left:1px solid var(--line)}
  .opt{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;background:#101012;border:1px solid var(--line);
       padding:14px;margin-bottom:10px;cursor:pointer;font-family:inherit;font-size:16px;color:var(--ink);border-radius:2px;transition:.15s}
  .opt:hover{border-color:var(--accent);background:#16100e}
  .opt.sel{border-color:var(--accent);background:var(--tint)}
  .opt.ro{cursor:default}
  .opt .k{flex:0 0 26px;height:26px;border:1px solid var(--ink);border-radius:50%;display:grid;place-items:center;font-family:var(--sans);font-size:13px;font-weight:700}
  .opt.sel .k{background:var(--accent);border-color:var(--accent);color:#fff}
  .btn{font-family:var(--sans);font-size:13px;letter-spacing:.06em;text-transform:uppercase;background:var(--accent);color:#fff;border:1px solid var(--accent);padding:13px 18px;cursor:pointer;border-radius:2px;font-weight:600}
  .btn.ghost{background:none;color:var(--ink);border-color:var(--ink)}
  .btn:disabled{opacity:.35;cursor:default}
  .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  .tag{display:inline-block;font-family:var(--sans);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;padding:5px 10px;color:#fff;background:var(--ink);margin-bottom:10px;border-radius:2px}
  .tag.good{background:var(--good)}.tag.mid{background:var(--warn)}.tag.bad{background:var(--bad)}
  .lesson{background:#16100e;border-left:2px solid var(--accent);padding:14px;margin-top:14px}
  .lesson b{display:block;font-family:var(--sans);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent2);margin-bottom:4px}
  .bars{margin:16px 0}
  .brow{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-family:var(--sans);font-size:12.5px}
  .brow .lab{width:20px;font-weight:700}
  .brow .track{flex:1;height:12px;background:#1d1d21;border-radius:1px;overflow:hidden}
  .brow .track{display:block}
  .brow .fill{display:block;height:100%;background:var(--accent);width:0;transition:width .5s cubic-bezier(.2,.7,.3,1)}
  .brow .fill.lead{background:var(--good)}
  .brow .val{width:78px;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  .big{font-size:clamp(30px,9vw,54px);line-height:1;color:var(--accent);font-weight:400}
  .src{font-family:var(--sans);font-size:11px;color:var(--soft);line-height:1.5}
  /* --- PC Secours : plan, jauges, journal --- */
  .plan{border:1px solid var(--line);background:#0a0a0c;overflow:hidden;margin:0 0 8px;flex:1 1 auto;min-height:0;display:flex;align-items:center}
  .plan svg{display:block;width:100%;height:100%}
  .gauges{font-family:var(--sans);font-size:11px;flex:0 0 auto}
  .g{display:flex;align-items:center;gap:8px;margin-bottom:4px}
  .gl{flex:0 0 76px;color:var(--soft);letter-spacing:.05em;text-transform:uppercase;font-size:9.5px}
  .gt{flex:1;height:8px;background:#1d1d21;overflow:hidden}
  .gf{display:block;height:100%;background:var(--accent);transition:width .5s cubic-bezier(.2,.7,.3,1)}
  .gf.hot{background:#c9482f}
  .gv{flex:0 0 128px;text-align:right;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}
  .gline{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
  .tag{font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;padding:3px 7px;border:1px solid var(--line);color:var(--soft)}
  .tag.on{border-color:#5f7f6a;color:#9dc3aa}
  .tag.off{border-color:#8d3524;color:#e08b7a}
  .tension{font-family:var(--sans);font-size:11px;letter-spacing:.04em;padding:5px 9px;margin:0 0 7px;border-left:3px solid var(--soft);color:#c9c1b4;background:var(--card)}
  .tension b{font-weight:600}
  .tension.crit{border-left-color:var(--bad);color:#f0d9d2}
  .tension.warn{border-left-color:var(--warn)}
  .tension.dead{border-left-color:#7a1a0c}
  .radio{font-family:var(--sans);font-size:10.5px;margin-top:6px;flex:0 0 auto}
  .rh{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:3px}
  .rl{display:flex;gap:6px;line-height:1.35;padding:2px 0;border-bottom:1px dotted #232327}
  .rl .rt{color:var(--soft);flex:0 0 52px}
  .rl.alerte .rt{color:var(--warn)}
  .rl.critique{color:#e6b8ab}
  .frise{display:flex;flex-direction:column;gap:3px;font-family:var(--sans);font-size:11px;flex:1 1 auto;min-height:0;overflow:hidden}
  .fr{display:grid;grid-template-columns:64px 132px 1fr;gap:8px;align-items:baseline;border-bottom:1px dotted #232327;padding:3px 0}
  .fh{color:var(--soft);font-variant-numeric:tabular-nums}
  .fc{font-size:9.5px;letter-spacing:.04em;text-transform:uppercase}
  .fc.maitrise{color:#9dc3aa}
  .fc.conforme{color:#c0a05a}
  .fc.retard{color:#c98b5a}
  .fc.aggravation{color:#e08b7a}
  .synthese{font-family:var(--sans);font-size:12px;color:#c9c1b4;margin-top:8px;flex:0 0 auto}
  .synthese b{color:var(--ink);font-size:15px}
  details.gloss{font-family:var(--sans);font-size:10.5px;color:#c9c1b4;border-top:1px solid var(--line);padding-top:6px}
  details.gloss summary{cursor:pointer;font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--soft)}
  details.gloss p{margin:4px 0 0}
  details.gloss b{color:var(--ink)}
  ul.barrieres{list-style:none;padding:0;margin:0;font-family:var(--sans);font-size:11.5px}
  ul.barrieres li{padding:2px 0 2px 18px;position:relative;color:#c9c1b4}
  ul.barrieres li:before{position:absolute;left:0}
  ul.barrieres li.ok:before{content:"✓";color:#9dc3aa}
  ul.barrieres li.ko:before{content:"✗";color:#e08b7a}
  /* --- mode écran unique : tout tient dans la fenêtre --- */
  body.deck{overflow:hidden}
  body.deck .wrap{max-width:none;width:100%;height:100dvh;padding:0;display:flex;flex-direction:column}
  body.deck .bar{margin:0;padding:12px 26px;flex:0 0 auto}
  body.deck #main{flex:1 1 auto;min-height:0;display:flex;overflow:hidden}
  .stage{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1.05fr .95fr;gap:26px;padding:10px 26px 14px;overflow:hidden}
  .stage.one{grid-template-columns:1fr}
  .stage .pane{min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:safe center}
  .stage .pane.right{justify-content:flex-start}
  body.deck h1{font-size:clamp(24px,5.6vh,68px);margin:0 0 6px}
  body.deck h2{font-size:clamp(17px,3.3vh,38px);margin:0 0 8px}
  body.deck p{font-size:clamp(12.5px,1.85vh,24px);line-height:1.42;margin:0 0 8px}
  body.deck .kicker{font-size:clamp(9px,1.15vh,11px);margin-bottom:5px}
  body.deck .card{padding:13px 15px;margin:0 0 10px}
  body.deck .card h3{font-size:clamp(9px,1.1vh,11px);margin:0 0 4px}
  body.deck .opt{padding:13px 14px;margin:0 0 10px;font-size:clamp(11.5px,1.72vh,22px);line-height:1.32}
  body.deck .opt .k{flex:0 0 22px;height:22px;font-size:11px}
  body.deck .illus{margin:0 0 8px}
  body.deck .illus svg{max-height:31vh;width:100%;height:auto;object-fit:contain}
  body.deck .illus.compact svg{max-height:22vh}
  body.deck .media{margin:0 0 10px}
  body.deck .media img,body.deck .media video{max-height:44vh}
  body.deck .bars{margin:4px 0 8px}
  body.deck .brow{font-size:clamp(10px,1.3vh,13px);margin-bottom:5px}
  body.deck .lesson{padding:12px 14px;margin-top:9px;font-size:clamp(11.5px,1.6vh,21px)}
  body.deck .role{font-size:clamp(9.5px,1.2vh,12px);padding:3px 8px;margin:0 0 6px}
  body.deck .roster{font-size:clamp(10.5px,1.5vh,18px);margin:6px 0 0}
  body.deck .row{margin-top:8px !important;gap:8px}
  body.deck .btn{padding:9px 16px;font-size:clamp(10px,1.25vh,16px)}
  body.deck .pill{font-size:clamp(10px,1.2vh,12px)}
  body.deck .join{padding:12px;margin-bottom:10px}
  body.deck .join .code{font-size:clamp(20px,3.6vh,34px)}
  body.deck .join .qr img{width:clamp(84px,13vh,120px);height:clamp(84px,13vh,120px)}
  body.deck .src{font-size:clamp(9px,1.05vh,11px);margin-top:6px}
  body.deck details ul{font-size:clamp(10px,1.25vh,13px)}
  .concl{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .concl .mini{border:1px solid var(--line);border-left:3px solid var(--accent);background:var(--card);padding:10px 12px;min-height:0}
  .concl .mini b{display:block;font-family:var(--sans);font-size:clamp(10px,1.3vh,17px);letter-spacing:.02em;margin-bottom:3px;color:var(--ink)}
  .concl .mini span{font-size:clamp(10.5px,1.45vh,19px);color:#c9c1b4;line-height:1.4;display:block}
  .concl .mini.accent{border-left-color:var(--accent2);background:#16100e}
  body.deck ul.l{font-size:clamp(10.5px,1.55vh,20px);margin:0}
  body.deck ul.l li{margin-bottom:5px}
  @media(max-width:1000px){
    .stage{grid-template-columns:1fr}
    body.deck .illus svg{max-height:20vh}
  }
  body.deck .plan{margin:0 0 6px}
  body.deck .gauges{font-size:clamp(10px,1.25vh,13px)}
  body.deck .gl{flex:0 0 66px;font-size:clamp(8px,1vh,10px)}
  body.deck .gv{flex:0 0 118px;white-space:nowrap}
  body.deck .radio{font-size:clamp(9.5px,1.15vh,12px)}
  body.deck .frise{font-size:clamp(9.5px,1.25vh,13px)}
  body.deck .fr{grid-template-columns:56px 120px 1fr}
  body.deck .synthese{font-size:clamp(10px,1.25vh,14px)}
  body.deck ul.barrieres{font-size:clamp(10px,1.2vh,13px)}
  /* --- petit écran : on rend la main au défilement normal --- */
  @media(max-width:980px),(max-height:520px){
    body.deck{overflow:auto}
    body.deck .wrap{height:auto;min-height:100dvh;display:block;padding:0}
    body.deck .bar{padding:10px 14px}
    body.deck #main{display:block;overflow:visible;min-height:0}
    body.deck .stage{display:block;padding:12px 15px 46px}
    body.deck .stage .pane{display:block;overflow:visible;justify-content:flex-start}
    body.deck .stage .pane + .pane{margin-top:22px}
    body.deck .illus{display:block}
    body.deck .illus svg{max-height:34vh;height:auto;width:100%}
    body.deck .illus.compact svg{max-height:30vh}
    body.deck h1{font-size:27px;line-height:1.18}
    body.deck h2{font-size:19px}
    body.deck p{font-size:16px;line-height:1.5}
    body.deck .opt{font-size:15px;padding:12px 13px}
    body.deck .opt .k{flex:0 0 24px;height:24px;font-size:11px}
    body.deck .kicker{font-size:10px}
    body.deck .roster{font-size:13px}
    body.deck .lesson{font-size:14.5px}
    body.deck .card{padding:12px 13px}
    body.deck .concl{grid-template-columns:1fr;gap:9px}
    body.deck .btn{font-size:13px;padding:11px 15px}
    body.deck .row{flex-wrap:wrap}
    body.deck .join{flex-direction:column;align-items:flex-start}
    body.deck .join .qr img{width:132px;height:132px}
  }
  body.deck .stage .pane > *{flex:0 0 auto}
  body.deck .illus{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
  body.deck .illus svg{height:100%;width:100%;max-height:none}
  body.deck .media{flex:0 0 auto}
  /* --- ambiance : grain, vignette, pulsations --- */
  body:after{content:"";position:fixed;inset:-20%;pointer-events:none;z-index:60;opacity:.05;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>");
    animation:grain 1.1s steps(3) infinite}
  @keyframes grain{0%{transform:translate(0,0)}33%{transform:translate(-2%,1%)}66%{transform:translate(1%,-2%)}100%{transform:translate(0,0)}}
  body:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:55;
    background:radial-gradient(115% 85% at 50% 42%,transparent 38%,rgba(0,0,0,.82) 100%);
    animation:breathe 11s ease-in-out infinite}
  @keyframes breathe{0%,100%{opacity:.7}50%{opacity:1}}
  .siren{position:fixed;top:0;left:0;right:0;height:2px;background:#b4451f;opacity:.18;z-index:70;pointer-events:none}
  .siren.on{animation:siren 2.6s ease-in-out infinite}
  @keyframes siren{0%,100%{opacity:.12}50%{opacity:.7}}
  #main > *{animation:rise .55s cubic-bezier(.2,.7,.3,1) both}
  #main > h1{animation-delay:.04s}
  #main > .card{animation-delay:.1s}
  #main > .illus{animation-delay:.08s}
  #main > .opts{animation-delay:.16s}
  #main > p:nth-of-type(2){animation-delay:.1s}
  #main > p:nth-of-type(3){animation-delay:.18s}
  #main > p:nth-of-type(4){animation-delay:.26s}
  @keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .illus svg{animation:dim 8s ease-in-out infinite}
  @keyframes dim{0%,100%{opacity:.9}50%{opacity:1}}
  .clock{animation:beat 3.4s ease-in-out infinite}
  @keyframes beat{0%,100%{box-shadow:0 0 0 0 rgba(180,69,31,0)}50%{box-shadow:0 0 0 3px rgba(180,69,31,.18)}}
  .card.danger{border-left-color:#c9482f;animation:flash 1.5s ease-in-out 3}
  @keyframes flash{0%,100%{box-shadow:none}50%{box-shadow:0 0 26px rgba(201,72,47,.28)}}
  .illus.danger svg{filter:saturate(1.3) contrast(1.05)}
  @media (prefers-reduced-motion: reduce){
    body:after,body:before,.illus svg,.clock,.siren.on,#main > *,.card.danger{animation:none !important}
  }
  .join{background:#151517;border:1px solid var(--line);color:var(--ink);padding:16px;margin-bottom:16px}
  .join b{font-family:var(--sans);letter-spacing:.16em;font-size:11px;text-transform:uppercase;color:var(--accent2);display:block;margin-bottom:6px}
  .join .code{font-family:var(--sans);font-size:34px;letter-spacing:.22em;font-weight:700}
  .join .u{font-family:var(--sans);font-size:12px;color:var(--soft);word-break:break-all;margin-top:6px}
  .pill{font-family:var(--sans);font-size:12px;border:1px solid var(--line);padding:4px 9px;border-radius:20px;color:var(--soft)}
  .roomline{font-family:var(--sans);font-size:11.5px;color:var(--soft);margin:-12px 0 16px}
  .roomline b{letter-spacing:.14em;color:var(--ink)}
`;

const ANIM = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Feyzin 1966 — écran de salle</title>
<style>${BASE_CSS}</style></head><body><div class="wrap">
<div class="bar"><div class="brand">Feyzin 1966 · écran de salle</div>
<div class="barright"><button class="mini" id="son" onclick="basculerSon()" title="Alarmes sonores">son : on</button>
<button class="mini" onclick="aide()" title="Raccourcis clavier">raccourcis</button>
<div class="clock" id="clock">SALLE</div></div></div>
<div class="siren" id="siren"></div>
<div class="roomline" id="roomline"></div>
<div id="main"></div></div>
<script>
const STEPS = __STEPS__;
const INTRO = __INTRO__;
const MEDIA = __MEDIA__;
const ROLES = __ROLES__;
const POSTES = __POSTES__;
const ILLUS = __ILLUS__;
const CONCLUSIONS = __CONC__;
const HIST = __HIST__;
const MAP = __MAP__;
let S = {step:-1, phase:'intro', votes:{}, total:0, participants:0}, ws, myVote = null;

const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code = (new URLSearchParams(location.search).get('room') || '').toUpperCase() || Array.from(crypto.getRandomValues(new Uint8Array(4))).map(b=>A[b%A.length]).join('');
const joinUrl = location.origin + '/p/' + code;

function connect(){
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  ws = new WebSocket(proto + '://' + location.host + '/ws?room=' + code + '&role=anim');
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.type === 'state'){ S = m.state; render(); } };
  ws.onclose = () => setTimeout(connect, 1500);
  ws.onopen = () => {
    document.getElementById('clock').textContent = 'SALLE ' + code;
    const rl = document.getElementById('roomline');
    if (rl) rl.innerHTML = '';
  };
}
function send(o){ if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); }
function chap(i){ send({ type: 'chapter', i: Math.max(0, i) }); }
function startGame(){ send({ type: 'open', step: 0 }); }

const $ = s => document.querySelector(s);
const pct = (a,b) => b ? Math.round(a/b*100) : 0;
function media(name, big){
  const m = MEDIA[name];
  if (!m) return '';
  if (m.kind === 'video'){
    if (!big) return '<p class="src" style="margin-top:14px">Le film d’époque est projeté sur l’écran de salle.</p>';
    return '<figure class="media"><video controls preload="auto" playsinline src="'+m.src+'"></video>'
      + '<figcaption>'+m.caption+' <span class="credit">'+m.credit+'</span></figcaption></figure>';
  }
  return '<figure class="media"><img src="'+m.src+'" alt="'+m.caption+'" loading="lazy">'
    + '<figcaption>'+m.caption+' <span class="credit">'+m.credit+'</span></figcaption></figure>';
}
function roleLine(i){ return '<div class="role">Dans cette scène, vous êtes '+ROLES[i]+'.</div>'; }
function roster(){
  const l = (S.roster || []);
  if (!l.length) return '<p class="roster">Personne n’est encore entré. Donnez-leur le lien ci-dessus.</p>';
  return '<p class="roster">Ce matin, dans la salle : ' + l.map(p => '<b>' + p.name + '</b> (' + p.poste + ')').join(', ') + '.</p>';
}
function copierLien(b){
  const v = document.getElementById('lien');
  v.select();
  try { navigator.clipboard.writeText(v.value); } catch (e) { document.execCommand('copy'); }
  const t = b.textContent; b.textContent = 'Copié';
  setTimeout(() => { b.textContent = t; }, 1600);
}
function bars(){
  const tot = S.total || 0;
  return '<div class="bars">' + [0,1,2].map(j=>{
    const v = S.votes[j] || 0, w = pct(v,tot);
    const best = [0,1,2].reduce((a,k)=> (S.votes[k]||0) > (S.votes[a]||0) ? k : a, 0);
    const lead = (v > 0 && j === best) ? ' lead' : '';
    return '<div class="brow"><span class="lab">'+'ABC'[j]+'</span><span class="track"><span class="fill'+lead+'" style="width:'+w+'%"></span></span><span class="val">'+v+' · '+w+'%</span></div>';
  }).join('') + '</div>';
}

/* ---------- tableau de bord PC Secours ---------- */
function jauges(c){
  if (!c) return '';
  const G = (lab, val, max, txt, alerte) => {
    const w = Math.max(0, Math.min(100, (val/(max||1))*100));
    return '<div class="g"><span class="gl">'+lab+'</span><span class="gt"><span class="gf'+(alerte?' hot':'')+'" style="width:'+w.toFixed(1)+'%"></span></span><span class="gv">'+txt+'</span></div>';
  };
  const s443ok = c.pression443 !== null;
  return '<div class="gauges">'
    + G('Paroi 443', s443ok ? c.temperature443 : 0, 70, s443ok ? Math.round(c.temperature443)+' °C' : 'rompue', s443ok && c.temperature443 > 45)
    + G('Pression', s443ok ? c.pression443 : 0, 25, s443ok ? c.pression443.toFixed(1)+' bar' : '—', s443ok && c.pression443 > 15)
    + G('Nappe', c.nappe.rayon, 200, Math.round(c.nappe.masse).toLocaleString('fr-FR')+' kg · '+c.nappe.rayon+' m', c.nappe.rayon > 110)
    + G('Réserve eau', c.eau, 100, Math.round(c.eau)+' %', c.eau < 25)
    + '<div class="gline"><span class="tag'+(c.a7 === 'closed' ? ' on' : '')+'">A7 '+(c.a7 === 'closed' ? 'coupée' : 'ouverte')+'</span>'
    + '<span class="tag'+(c.evacuated ? ' on' : '')+'">périmètre '+c.perimetre+' m'+(c.evacuated ? ' évacué' : '')+'</span>'
    + '<span class="tag'+(c.ruptures ? ' off' : ' on')+'">'+c.ruptures+' rupture(s)</span></div>'
    + '</div>';
}

function bandeauTension(t){
  if (!t) return '';
  const l = t.niveau === 'critique' ? 'crit' : t.niveau === 'attention' ? 'warn' : t.niveau === 'irreversible' ? 'dead' : '';
  return '<div class="tension '+l+'"><b>'+t.texte+'</b>'+(t.heure ? ' · estimée à '+t.heure : '')+'</div>';
}

function journal(limite){
  const l = (S.criseJournal || []).slice(-limite);
  if (!l.length) return '';
  return '<div class="radio"><div class="rh">Journal radio</div>'
    + l.map(x=>'<div class="rl '+x.level+'"><span class="rt">'+x.h+'</span><span>'+x.text+'</span></div>').join('')
    + '</div>';
}

function debreenScreen(){
  const d = S.debrief, f = S.fin;
  if (!d || !f) return '<p>Débrief indisponible.</p>';
  const lignes = d.lignes.map(l=>'<div class="fr"><span class="fh">'+l.heure+'</span><span class="fc '+l.ecart+'">'+l.libelle+'</span><span class="ft">'+l.titre+'</span></div>').join('');
  const bar = f.barrières.map(b=>'<li class="'+(b.tenu?'ok':'ko')+'">'+b.nom+'</li>').join('');
  return '<div class="stage">'
    + '<div class="pane"><div class="kicker">Débrief · vos décisions face au réel</div><h1>'+f.titre+'</h1>'
    + '<div class="frise">'+lignes+'</div>'
    + '<div class="synthese"><b>'+f.morts+'</b> morts · <b>'+f.blesses+'</b> blessés · '+f.tenues+'/'+f.total+' barrières tenues</div>'
    + '</div>'
    + '<div class="pane right"><div class="card"><h3 style="margin-top:0">Les barrières</h3><ul class="barrieres">'+bar+'</ul></div>'
    + '<div class="card plain"><h3 style="margin-top:0">Ce que cela veut dire</h3><p>'+d.conclusion+'</p></div>'
    + '<div class="card plain"><h3 style="margin-top:0">Ce que la réglementation en a fait</h3>'
    + (HIST.reglementation||[]).slice(0,3).map(r=>'<p><b>'+r.annee+'</b> · '+r.texte+'.</p>').join('')+'</div>'
    + '<details class="gloss"><summary>Les mots du dossier</summary>'
    + (HIST.glossaire||[]).map(g=>'<p><b>'+g.titre+'</b> '+g.texte+'</p>').join('')+'</details>'
    + '<div class="row"><button class="btn ghost" onclick="send({type:\\'reset\\'})">Nouvelle session</button></div>'
    + '</div></div>';
}

/* ---------- son et raccourcis ---------- */
let sonActif = localStorage.getItem('feyzin.son') !== 'off';
let audio = null, dernierNiveau = null;

function basculerSon(){
  sonActif = !sonActif;
  localStorage.setItem('feyzin.son', sonActif ? 'on' : 'off');
  const b = document.getElementById('son');
  if (b) b.textContent = 'son : ' + (sonActif ? 'on' : 'off');
}

function bip(niveau){
  if (!sonActif) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = 'sine';
    o.frequency.value = niveau === 'critique' ? 660 : 440;
    g.gain.value = 0.05;
    o.connect(g); g.connect(audio.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.5);
    o.stop(audio.currentTime + 0.55);
  } catch (e) {}
}

function alerterSiBesoin(){
  const n = S.tension ? S.tension.niveau : null;
  if (n && n !== dernierNiveau && (n === 'critique' || n === 'irreversible')) bip(n);
  dernierNiveau = n;
}

function aide(){
  const d = document.getElementById('aide');
  if (d) { d.remove(); return; }
  const box = document.createElement('div');
  box.id = 'aide';
  box.className = 'card';
  box.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:20;max-width:320px';
  box.innerHTML = '<h3 style="margin-top:0">Raccourcis</h3>'
    + '<p style="margin:0 0 4px"><b>C</b> clore le vote · <b>N</b> étape suivante</p>'
    + '<p style="margin:0 0 4px"><b>R</b> réouvrir le vote · <b>D</b> débrief</p>'
    + '<p style="margin:0"><b>M</b> couper le son · <b>?</b> cette aide</p>';
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 6000);
}

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const b = (t) => [...document.querySelectorAll('.btn')].find(x => x.textContent.toLowerCase().includes(t));
  const t = e.key.toLowerCase();
  if (t === 'c' && b('clore')) { b('clore').click(); }
  else if (t === 'n' && b('étape suivante')) { b('étape suivante').click(); }
  else if (t === 'n' && b('voir le débrief')) { b('voir le débrief').click(); }
  else if (t === 'r' && b('réouvrir')) { b('réouvrir').click(); }
  else if (t === 'm') { basculerSon(); }
  else if (t === '?' || t === '/') { aide(); }
});

document.addEventListener('click', () => { if (!audio && sonActif) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } }, { once: true });

function render(){
  const st = S.step, ph = S.phase;
  const sn = document.getElementById('siren');
  if (sn) sn.classList.remove('on');
  document.body.classList.add('deck');
  const rl = document.getElementById('roomline');
  if (rl) rl.innerHTML = '';

  if (ph === 'intro') {
    const it = INTRO[S.intro || 0] || INTRO[0];
    document.getElementById('clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = \`
      <div class="stage">
        <div class="pane">
          <div class="kicker">\${it.k} · \${(S.intro||0)+1} sur \${INTRO.length}</div>
          <h1>\${it.h}</h1>
          \${it.p.map(x=>'<p>'+x+'</p>').join('')}
        </div>
        <div class="pane right">
          \${media(it.media, true)}
          <div class="row">
            <button class="btn ghost" onclick="chap(\${(S.intro||0)-1})" \${(S.intro||0)===0?'disabled':''}>Précédent</button>
            \${(S.intro||0) < INTRO.length-1
              ? '<button class="btn" onclick="chap('+((S.intro||0)+1)+')">Suite</button>'
              : '<button class="btn" onclick="startGame()">Première question</button>'}
          </div>
          <p class="src">Chronologie et chiffres : fiche ARIA n°1 du ministère de l’environnement (septembre 2006).</p>
        </div>
      </div>\`;
    return;
  }

  if (st < 0) {
    document.getElementById('clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = \`
      <div class="stage">
        <div class="pane">
          <div class="kicker">Ils entrent dans la salle</div>
          <div class="join">
            <div class="txt">
              <b>Le lien, à ouvrir sur votre téléphone</b>
              <div class="code">\${code}</div>
              <div class="lien"><input id="lien" readonly value="\${joinUrl}" onclick="this.select()">
                <button class="btn ghost" onclick="copierLien(this)">Copier</button></div>
            </div>
            <div class="qr"><img alt="QR code vers la page des participants" src="https://api.qrserver.com/v1/create-qr-code/?size=264x264&margin=0&data=\${encodeURIComponent(joinUrl)}"></div>
          </div>
          \${roster()}
          <details style="margin-top:10px">
            <summary style="font-family:var(--sans);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);cursor:pointer">Notes pour l’animateur</summary>
            <ul style="font-size:13px;margin-top:8px">
              <li>L’introduction fait quatre écrans, deux minutes. Lisez-les à voix haute.</li>
              <li>Laissez voter trente à soixante secondes, les barres bougent en direct.</li>
              <li>Clore le vote ouvre la branche majoritaire, puis le rappel du réel.</li>
              <li>Sept étapes, vingt-cinq à trente-cinq minutes jusqu’aux conclusions.</li>
              <li>Trois mots : GPL, sphère, BLEVE (l’éclatement d’une capacité chauffée par un incendie).</li>
            </ul>
          </details>
        </div>
        <div class="pane right">
          <h1>Feyzin, 4 janvier 1966<br><em>Sept décisions avant l’aube</em></h1>
          <p>Chaque scène est votée en salle. L’histoire bascule selon la majorité : ce que vous choisissez devient la suite, pas seulement un score.</p>
          <div class="row" style="margin-top:10px">
            <button class="btn" onclick="send({type:'chapter',i:0})">Commencer l’introduction</button>
            <span class="pill">\${(S.roster||[]).length} dans la salle</span>
          </div>
        </div>
      </div>\`;
    return;
  }

  const step = STEPS[st];

  if (ph === 'vote') {
    document.getElementById('clock').textContent = step.h;
    $('#main').innerHTML = \`
      <div class="stage">
        <div class="pane">
          <div class="kicker">Étape \${st+1} sur 7 · \${step.t}</div>
          \${bandeauTension(S.tension)}
          <div class="plan">\${MAP(S.crise || {})}</div>
          \${jauges(S.crise)}
        </div>
        <div class="pane right">
          <h2>\${step.q}</h2>
          \${roleLine(st)}
          \${step.o.map((o,j)=>'<div class="opt ro"><span class="k">'+'ABC'[j]+'</span><span>'+o.txt+'</span></div>').join('')}
          \${bars()}
          \${journal(3)}
          <div class="row">
            <button class="btn" onclick="send({type:'close'})">Clore le vote</button>
            <span class="pill">\${S.total} votant(s) · \${(S.roster||[]).length} dans la salle</span>
          </div>
        </div>
      </div>\`;
    alerterSiBesoin();
    return;
  }

  if (ph === 'reveal') {
    document.getElementById('clock').textContent = step.h;
    const win = [0,1,2].reduce((a,j)=> (S.votes[j]||0) > (S.votes[a]||0) ? j : a, 0);
    const o = step.o[win];
    if (o.p === 0 && sn) sn.classList.add('on');
    $('#main').innerHTML = \`
      <div class="stage">
        <div class="pane">
          <div class="kicker">Étape \${st+1} sur 7 · \${step.t}</div>
          \${bandeauTension(S.tension)}
          <div class="plan">\${MAP(S.crise || {})}</div>
          \${jauges(S.crise)}
          \${journal(4)}
        </div>
        <div class="pane right">
          \${S.total === 0
            ? '<div class="card"><h3 style="margin-top:0">Aucun vote enregistré</h3><p>Faute de vote, l’histoire suit son cours réel : la branche qui s’ouvre est celle de 1966.</p></div>'
            : '<div class="card"><h3 style="margin-top:0">Votre majorité : '+\'ABC\'[win]+', à '+pct(S.votes[win]||0,S.total)+'%</h3><p>'+o.br+'</p></div>'}
          <div class="card plain \${o.p === 0 ? 'danger' : ''}"><h3 style="margin-top:0">Ce qui s’est réellement passé</h3><p>\${step.real}</p></div>
          \${o.p === 0 ? '<p class="src" style="color:#c9482f">La branche que vous venez de choisir est celle qui a conduit à l’accident.</p>' : ''}
          <div class="lesson"><b>Le point de sûreté</b>\${step.l}</div>
          <div class="row">
            <button class="btn" onclick="send({type:'next'})">\${st < 6 ? 'Étape suivante' : 'Voir le débrief'}</button>
            <button class="btn ghost" onclick="send({type:'open',step:\${st}})">Réouvrir le vote</button>
          </div>
        </div>
      </div>\`;
    alerterSiBesoin();
    return;
  }

  document.getElementById('clock').textContent = 'DÉBRIEF';
  $('#main').innerHTML = debreenScreen();
  alerterSiBesoin();
}
connect();
</script></body></html>`;


const PART = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Feyzin 1966 — votre vote</title>
<style>${BASE_CSS}</style></head><body><div class="wrap">
<div class="siren" id="siren"></div>
<div class="bar"><div class="brand">Feyzin 1966 · salle __CODE__</div><div class="clock" id="clock">CONNEXION</div></div>
<div id="main"></div></div>
<script>
const STEPS = __STEPS__;
const INTRO = __INTRO__;
const MEDIA = __MEDIA__;
const ROLES = __ROLES__;
const POSTES = __POSTES__;
const ILLUS = __ILLUS__;
const HIST = __HIST__;
let S = {step:-1, phase:'lobby', votes:{}, total:0, participants:0}, ws, myVote = null, myStep = -1;
let pid = localStorage.getItem('feyzin.pid');
if (!pid) { pid = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('feyzin.pid', pid); }
let moi = null;
try { moi = JSON.parse(localStorage.getItem('feyzin.moi') || 'null'); } catch (e) { moi = null; }
const code = '__CODE__';

function connect(){
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  ws = new WebSocket(proto + '://' + location.host + '/ws?room=' + code + '&role=part&pid=' + encodeURIComponent(pid));
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.type === 'state'){ S = m.state; if (S.step !== myStep){ myStep = S.step; myVote = null; } render(); }
    if (m.type === 'voted'){ myVote = m.j; render(); }
    if (m.type === 'you'){
      if (m.name) { moi = { name: m.name, poste: m.poste }; localStorage.setItem('feyzin.moi', JSON.stringify(moi)); }
      if (m.j !== undefined) myVote = m.j;
      render();
    }
  };
  ws.onclose = () => setTimeout(connect, 1500);
}
function send(o){ if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); }
const $ = s => document.querySelector(s);
const pct = (a,b) => b ? Math.round(a/b*100) : 0;
function media(name){
  const m = MEDIA[name];
  if (!m) return '';
  if (m.kind === 'video') return '<p class="src" style="margin-top:12px">Le film d’époque est projeté sur l’écran de salle.</p>';
  return '<figure class="media"><img src="'+m.src+'" alt="'+m.caption+'" loading="lazy">'
    + '<figcaption>'+m.caption+'</figcaption></figure>';
}
function roleLine(i){ return '<div class="role">Vous êtes '+ROLES[i]+'.</div>'; }

function etatCrise(){
  const c = S.crise, t = S.tension;
  if (!c) return '';
  const p = c.pression443 === null ? 'rompue' : c.pression443.toFixed(1)+' bar';
  const temp = c.temperature443 === null ? '—' : Math.round(c.temperature443)+' °C';
  const ligne = 'paroi '+temp+' · '+p+' · nappe '+c.nappe.rayon+' m · eau '+Math.round(c.eau)+' %';
  if (!t) return '<p class="src">'+ligne+'</p>';
  const l = t.niveau === 'critique' ? 'crit' : t.niveau === 'attention' ? 'warn' : t.niveau === 'irreversible' ? 'dead' : '';
  return '<div class="tension '+l+'"><b>'+t.texte+'</b></div><p class="src">'+ligne+'</p>';
}

function resumePartage(){
  if (!S.debrief) return '';
  const d = S.debrief, f = S.fin;
  const lignes = d.lignes.map(l=>l.heure+' · '+l.titre+' · '+l.libelle).join(String.fromCharCode(10));
  const NL = String.fromCharCode(10);
  const texte = ['Feyzin 1966' + (f ? ' · ' + f.titre : ''),
    f ? f.morts + ' morts, ' + f.blesses + ' blessés, ' + f.tenues + '/' + f.total + ' barrières tenues' : '',
    '', lignes].join(NL);
  const court = 'Feyzin 1966 : ' + (f ? f.titre + ' (' + f.morts + ' morts)' : '') + ' · ' + (d.synthese ? d.synthese.maitrise + ' décisions plus prudentes que le réel' : '');
  return '<div class="card"><h3 style="margin-top:0">Votre partie</h3>'
    + '<p style="margin:0 0 8px">'+(f ? f.titre+' · '+f.morts+' morts · '+f.blesses+' blessés · '+f.tenues+'/'+f.total+' barrières tenues' : '')+'</p>'
    + '<button class="btn ghost" onclick="partager()">Copier le résumé</button>'
    + '<p class="src" id="partage">'+court+'</p>'
    + '<textarea id="resume" style="position:absolute;left:-9999px">'+texte+'</textarea></div>';
}

function partager(){
  const t = (document.getElementById('resume') || {}).value || '';
  const fin = () => { const p = document.getElementById('partage'); if (p) p.textContent = 'Résumé copié.'; };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(fin, fin);
  else {
    const ta = document.getElementById('resume');
    if (ta) { ta.select(); document.execCommand('copy'); }
    fin();
  }
}

function render(){
  if (!moi){
    document.getElementById('clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = '<div class="kicker">Vous entrez dans la salle</div>'
      + '<h1>Votre prénom</h1>'
      + '<p>Il servira à vous nommer dans l’histoire. Rien d’autre n’est demandé, aucun compte.</p>'
      + '<form onsubmit="return entrer(event)"><input id="prenom" maxlength="22" autocomplete="given-name" placeholder="Votre prénom" '
      + 'style="width:100%;font-family:inherit;font-size:20px;padding:14px;background:#101012;color:var(--ink);border:1px solid var(--line);border-radius:2px">'
      + '<p style="margin-top:14px"><button class="btn" type="submit">Entrer dans la salle</button></p></form>';
    return;
  }
  if (S.phase === 'intro'){
    const it = INTRO[S.intro || 0] || INTRO[0];
    document.getElementById('clock').textContent = 'INTRO';
    $('#main').innerHTML = '<div class="kicker">'+it.k+' · '+((S.intro||0)+1)+' sur '+INTRO.length+'</div><h1 style="font-size:clamp(22px,5.4vw,32px)">'+it.h+'</h1>'
      + it.p.map(x=>'<p>'+x+'</p>').join('')
      + media(it.media, false)
      + '<p class="src">Gardez cette page ouverte. L’animateur avance, la première question arrive ensuite.</p>';
    return;
  }
  if (S.step < 0){
    document.getElementById('clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = '<div class="kicker">Connecté</div><h1>Feyzin 1966</h1><p>Vous êtes dans la salle. Gardez cette page ouverte : l\\'animateur lance l\\'introduction puis la première décision.</p>';
    return;
  }
  const st = STEPS[S.step];
  if (S.phase === 'vote'){
    document.getElementById('clock').textContent = st.h;
    $('#main').innerHTML = \`
      <div class="kicker">Étape \${S.step+1} sur 7 · \${st.t}</div>
      <h1>\${st.h}</h1>
      <div class="moi">Vous : \${moi.name}\${moi.poste ? ' · ' + moi.poste : ''}</div>
      \${etatCrise()}
      \${roleLine(S.step)}
      <figure class="illus">\${ILLUS[S.step] || ''}</figure>
      <div class="card plain" style="font-size:15.5px"><p>\${st.s}</p></div>
      <h2>\${st.q}</h2>
      \${st.o.map((o,j)=>'<button class="opt '+(myVote===j?'sel':'')+'" onclick="vote('+j+')"><span class="k">'+'ABC'[j]+'</span><span>'+o.txt+'</span></button>').join('')}
      <div class="bars">\${[0,1,2].map(j=>{const v=S.votes[j]||0,w=pct(v,S.total);
        return '<div class="brow"><span class="lab">'+'ABC'[j]+'</span><span class="track"><span class="fill" style="width:'+w+'%"></span></span><span class="val">'+v+' · '+w+'%</span></div>';}).join('')}</div>
      <p class="src">\${myVote===null
        ? 'Touchez une réponse pour voter. ' + S.total + ' vote(s) déjà en salle.'
        : 'Votre choix est enregistré. Vous pouvez changer tant que le vote est ouvert. ' + S.total + ' vote(s) en salle.'}</p>\`;
    return;
  }
  if (S.phase === 'reveal'){
    const win = [0,1,2].reduce((a,j)=> (S.votes[j]||0) > (S.votes[a]||0) ? j : a, 0);
    const mine = myVote !== null ? STEPS[S.step].o[myVote] : null;
    document.getElementById('clock').textContent = st.h;
    $('#main').innerHTML = \`
      <div class="kicker">Résultat de l'étape \${S.step+1}</div>
      <figure class="illus compact">\${ILLUS[S.step] || ''}</figure>
      <h1>\${S.total === 0 ? 'Aucun vote' : 'La salle a choisi ' + 'ABC'[win]}</h1>
      <p>\${S.total === 0 ? 'La salle n’a pas voté : l’histoire suit son cours réel.' : pct(S.votes[win]||0,S.total)+'% des votes. '+(myVote===null?'Vous n’avez pas voté.':(myVote===win?'Votre choix l’emporte.':'Votre choix était le ' + 'ABC'[myVote] + '.'))}</p>
      <div class="card"><h3 style="margin-top:0">\${S.total === 0 ? 'La suite réelle' : 'La branche qui s’ouvre'}</h3><p>\${st.o[win].br}</p></div>
      <div class="card plain"><h3 style="margin-top:0">Et le 4 janvier 1966</h3><p>\${st.real}</p></div>
      <div class="lesson"><b>Le point de sûreté</b>\${st.l}</div>
      \${mine ? '<p class="src">Votre option valait '+mine.p+' point(s) de sûreté.</p>' : ''}
      <p class="src" style="margin-top:6px">L'animateur enchaîne sur l'étape suivante. Restez sur cette page.</p>\`;
    return;
  }
  document.getElementById('clock').textContent = 'DÉBRIEF';
  $('#main').innerHTML = '<div class="kicker">Fin de session</div><h1>Merci</h1>'
    + resumePartage()
    + '<p>Sept décisions, deux heures vingt, et le 4 janvier 1966 : dix-huit morts, dont onze sapeurs-pompiers, quatre-vingt-quatre blessés, mille quatre cent soixante-quinze habitations touchées.</p>'
    + '<div class="card"><h3 style="margin-top:0">Ce qui a changé après</h3><p style="margin:0">Distances d’implantation, zones dangereuses, soupapes calculées pour un incendie généralisé, moyens d’eau, plans d’urgence et retour d’expérience obligatoire : le droit français du risque industriel est né de ce matin-là.</p></div>'
    + (HIST.glossaire||[]).filter(g=>g.titre==='BLEVE').map(g=>'<div class="card plain"><h3 style="margin-top:0">'+g.titre+'</h3><p style="margin:0">'+g.texte+'</p></div>').join('')
    + '<p class="src">Le débriefing complet est à l’écran de salle. Fiche ARIA n°1, ministère de l’environnement, septembre 2006.</p>';
}

function entrer(e){
  e.preventDefault();
  const v = (document.getElementById('prenom').value || '').trim();
  if (!v) return false;
  moi = { name: v, poste: '' };
  localStorage.setItem('feyzin.moi', JSON.stringify(moi));
  send({ type: 'join', name: v, pid });
  render();
  return false;
}

function vote(j){
  if (myVote === j) return;
  send({type:'vote', j, pid});
  myVote = j; render();
}
connect();
</script></body></html>`;

export { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, POSTES, ILLUS, ANIM, PART, BASE_CSS };
