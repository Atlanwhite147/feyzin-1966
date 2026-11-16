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
    src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c5/Accident_Feyzin.ogv/Accident_Feyzin.ogv.480p.vp9.webm",
    page: "https://commons.wikimedia.org/wiki/File:Accident_Feyzin.ogv",
    title: "Images du 4 janvier 1966",
    caption: "Film d'époque tourné sur place, quatre minutes, images et commentaire de 1966.",
    credit: "Jean Sivignon, CC BY-SA 3.0, Wikimedia Commons"
  },
  a7: {
    kind: "image",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Feyzin_-_Autoroute_A7_-_Vue_sur_la_raffinerie_de_Feyzin_01.jpeg/1920px-Feyzin_-_Autoroute_A7_-_Vue_sur_la_raffinerie_de_Feyzin_01.jpeg",
    page: "https://commons.wikimedia.org/wiki/File:Feyzin_-_Autoroute_A7_-_Vue_sur_la_raffinerie_de_Feyzin_01.jpeg",
    caption: "La raffinerie vue depuis l'autoroute A7, le même voisinage qu'en 1966.",
    credit: "Romainbehar, CC0, Wikimedia Commons"
  },
  memoire: {
    kind: "image",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Vienne_-_Cimeti%C3%A8re_du_Pipet%2C_monument_accident_raffinerie_Feyzin_1_%282020%29.jpg/1920px-Vienne_-_Cimeti%C3%A8re_du_Pipet%2C_monument_accident_raffinerie_Feyzin_1_%282020%29.jpg",
    page: "https://commons.wikimedia.org/wiki/File:Vienne_-_Cimeti%C3%A8re_du_Pipet,_monument_accident_raffinerie_Feyzin_1_(2020).jpg",
    caption: "À Vienne, le monument aux pompiers morts le 4 janvier 1966.",
    credit: "Sebleouf, CC BY-SA 4.0, Wikimedia Commons"
  },
  fumee: {
    kind: "image",
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg/1920px-Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg",
    page: "https://commons.wikimedia.org/wiki/File:Oil_refinery_smoke_over_Lyon_and_Fourvi%C3%A8re.jpg",
    caption: "La cheminée de la raffinerie, vue depuis Lyon.",
    credit: "Radiokafka, CC BY-SA 4.0, Wikimedia Commons"
  }
};

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
    k: "Prologue",
    h: "Il est six heures et demie",
    p: [
      "Il fait encore nuit sur Feyzin, au sud de Lyon. Dans la raffinerie, l'équipe de quart est en place depuis un moment. Les torchères éclairent les cuves, on entend le ronflement des unités, l'air sent le pétrole froid.",
      "Vous êtes cette équipe. Vous ne savez pas encore ce qui va se passer dans les deux heures qui viennent, et personne, ce matin-là, ne le sait."
    ],
    media: "a7"
  },
  {
    k: "Prologue",
    h: "Votre rôle",
    p: [
      "Vous n'êtes pas des spectateurs. Pendant sept scènes, vous serez ceux qui ont la main : l'aide-opérateur qui ouvre une vanne, le chef de quart qui donne un ordre, le garde qui voit le nuage traverser la route, le pompier qui approche d'une sphère en feu.",
      "À chaque scène, la salle décide. Ce que vous choisissez devient la suite de l'histoire, et vous verrez ensuite ce que les hommes de 1966, eux, ont fait."
    ]
  },
  {
    k: "Prologue",
    h: "Ce qui va se jouer",
    p: [
      "Deux heures vingt séparent la première purge de la première explosion. Une opération d'entretien de dix minutes, une clé mal fixée, un nuage qui descend vers une autoroute, une sphère d'acier de treize mètres qui chauffe.",
      "Ce n'est pas une fiction. Tout ce que vous allez voir est documenté, minute par minute, dans les rapports d'enquête de 1966 et 1967.",
      "Et à la fin, une question qui nous concerne tous : qu'aurions-nous fait, et qu'est-ce qui a changé depuis ?"
    ],
    media: "fumee"
  },
  {
    k: "Avant de commencer",
    h: "Les règles",
    p: [
      "Sept étapes, dans l'ordre du matin. À chaque étape, trois décisions possibles, un vote de la salle depuis les téléphones.",
      "La majorité l'emporte et c'est sa branche qui s'ouvre. Puis on regarde ce qui s'est réellement passé, et ce que la décision vaut en points de sûreté.",
      "Le but n'est pas de gagner. En 1966, la bonne réponse n'était écrite nulle part."
    ]
  },
  {
    k: "Avant de commencer",
    h: "Quatre mots pour suivre",
    p: [
      "GPL : gaz de pétrole liquéfié. Du propane et du butane, liquides sous pression dans des capacités d'acier.",
      "Sphère : le ballon d'acier qui contient le gaz, treize mètres de diamètre, posé sur dix pieds métalliques.",
      "BLEVE : quand une capacité de gaz liquéfié chauffée par un incendie cède d'un coup. Le liquide se vaporise en une fraction de seconde et projette une boule de feu. C'est le mot central de cette histoire.",
      "Torchère : le jet de gaz qui sort d'une soupape et brûle. ORSEC, puis PPI : l'organisation des secours décidée par le préfet quand le site dépasse ses propres moyens."
    ]
  },
  {
    k: "Archives",
    h: "Les images de 1966",
    p: [
      "Avant d'entrer dans la première scène, regardez ce que les caméras ont filmé ce jour-là. Quatre minutes, avec le commentaire d’époque."
    ],
    media: "film"
  }
];

const CONCLUSIONS = [
  ["Une opération de routine a suffi", "Une purge de prélèvement sur une sphère en remplissage, avec une clé à carré et un écrou non fixé."],
  ["La limite du site n'est pas la limite du danger", "Le nuage a traversé l'autoroute, et c'est une voiture à 160 mètres qui l'a allumé."],
  ["Les secours publics se préviennent en minutes", "Dix minutes pour joindre la gendarmerie, cinquante pour l'arrivée des pompiers de Lyon."],
  ["Le phénomène inconnu tue les sauveteurs", "Cent cinquante-huit hommes à cent mètres d'une sphère en feu, dont personne n'attendait l'éclatement."],
  ["Ce qui a suivi compte autant que l'accident", "Zones dangereuses, distances, plans d'urgence, retour d'expérience : le droit français du risque industriel est né ici."]
];

/* ---------- Cartes partagées ---------- */
const BASE_CSS = `
  :root{--ink:#1d1a17;--soft:#5f574e;--paper:#f7f3ec;--card:#fffdf9;--line:#ded4c5;--accent:#b4451f;--accent2:#8e3416;--tint:#f0ddd2;--good:#2f6b4f;--warn:#8a5a12;--bad:#a3321a;--sans:"Helvetica Neue",Arial,system-ui,sans-serif}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  html,body{margin:0;background:var(--paper);color:var(--ink)}
  body{font-family:Georgia,"Iowan Old Style",serif;line-height:1.5;font-size:17px;min-height:100dvh}
  .wrap{max-width:900px;margin:0 auto;padding:20px 18px 90px}
  @media(min-width:1100px){ .wrap{max-width:1080px;padding:28px 26px 96px} body{font-size:18px} }
  .media{margin:16px 0 0;border:1px solid var(--line);background:#000;overflow:hidden}
  .media img,.media video{display:block;width:100%;height:auto;max-height:52vh;object-fit:cover;background:#111}
  .media figcaption{background:var(--card);color:var(--soft);font-family:var(--sans);font-size:11.5px;padding:8px 11px;border-top:1px solid var(--line)}
  .media .credit{opacity:.75}
  .role{font-family:var(--sans);font-size:12px;letter-spacing:.05em;color:var(--accent2);
        background:var(--tint);display:inline-block;padding:5px 10px;border-radius:2px;margin:0 0 10px}
  .bar{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--ink);padding-bottom:9px;margin-bottom:20px;gap:10px}
  .brand{font-family:var(--sans);font-size:10px;letter-spacing:.17em;text-transform:uppercase;color:var(--soft)}
  .clock{font-family:var(--sans);font-size:12.5px;background:var(--accent);color:#fff;padding:4px 9px;border-radius:3px;white-space:nowrap}
  h1{font-size:clamp(26px,5.6vw,42px);line-height:1.07;font-weight:400;margin:0 0 12px}
  h1 em{font-style:normal;color:var(--accent)}
  h2{font-size:clamp(18px,4vw,24px);font-weight:400;margin:0 0 12px}
  h3{font-family:var(--sans);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);margin:20px 0 8px;font-weight:700}
  p{margin:0 0 12px}
  .kicker{font-family:var(--sans);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
  .card{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);padding:16px;margin-bottom:14px}
  .card.plain{border-left:1px solid var(--line)}
  .opt{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;background:var(--card);border:1px solid var(--line);
       padding:14px;margin-bottom:10px;cursor:pointer;font-family:inherit;font-size:16px;color:var(--ink);border-radius:2px;transition:.15s}
  .opt:hover{border-color:var(--accent)}
  .opt.sel{border-color:var(--accent);background:var(--tint)}
  .opt .k{flex:0 0 26px;height:26px;border:1px solid var(--ink);border-radius:50%;display:grid;place-items:center;font-family:var(--sans);font-size:13px;font-weight:700}
  .opt.sel .k{background:var(--accent);border-color:var(--accent);color:#fff}
  .btn{font-family:var(--sans);font-size:13px;letter-spacing:.06em;text-transform:uppercase;background:var(--accent);color:#fff;border:1px solid var(--accent);padding:13px 18px;cursor:pointer;border-radius:2px;font-weight:600}
  .btn.ghost{background:none;color:var(--ink);border-color:var(--ink)}
  .btn:disabled{opacity:.35;cursor:default}
  .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  .tag{display:inline-block;font-family:var(--sans);font-size:10.5px;letter-spacing:.13em;text-transform:uppercase;padding:5px 10px;color:#fff;background:var(--ink);margin-bottom:10px;border-radius:2px}
  .tag.good{background:var(--good)}.tag.mid{background:var(--warn)}.tag.bad{background:var(--bad)}
  .lesson{background:var(--tint);padding:14px;margin-top:14px}
  .lesson b{display:block;font-family:var(--sans);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent2);margin-bottom:4px}
  .bars{margin:16px 0}
  .brow{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-family:var(--sans);font-size:12.5px}
  .brow .lab{width:20px;font-weight:700}
  .brow .track{flex:1;height:14px;background:var(--line);border-radius:2px;overflow:hidden}
  .brow .fill{height:100%;background:var(--accent);width:0;transition:width .5s cubic-bezier(.2,.7,.3,1)}
  .brow .fill.lead{background:var(--good)}
  .brow .val{width:52px;text-align:right;font-variant-numeric:tabular-nums}
  .big{font-size:clamp(30px,9vw,54px);line-height:1;color:var(--accent);font-weight:400}
  .src{font-family:var(--sans);font-size:11px;color:var(--soft);line-height:1.5}
  .join{background:var(--ink);color:var(--paper);padding:16px;margin-bottom:16px}
  .join b{font-family:var(--sans);letter-spacing:.16em;font-size:11px;text-transform:uppercase;color:#d9b9a8;display:block;margin-bottom:6px}
  .join .code{font-family:var(--sans);font-size:34px;letter-spacing:.22em;font-weight:700}
  .join .u{font-family:var(--sans);font-size:12px;color:#cfc7ba;word-break:break-all;margin-top:6px}
  .pill{font-family:var(--sans);font-size:12px;border:1px solid var(--line);padding:4px 9px;border-radius:20px;color:var(--soft)}
  .roomline{font-family:var(--sans);font-size:11.5px;color:var(--soft);margin:-12px 0 16px}
  .roomline b{letter-spacing:.14em;color:var(--ink)}
`;

const ANIM = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Feyzin 1966 — écran de salle</title>
<style>${BASE_CSS}</style></head><body><div class="wrap">
<div class="bar"><div class="brand">Feyzin 1966 · écran de salle</div><div class="clock" id="clock">SALLE</div></div>
<div class="roomline" id="roomline"></div>
<div id="main"></div></div>
<script>
const STEPS = __STEPS__;
const INTRO = __INTRO__;
const MEDIA = __MEDIA__;
const ROLES = __ROLES__;
const CONCLUSIONS = __CONC__;
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
    if (rl) rl.innerHTML = 'Les participants rejoignent <b>' + joinUrl.replace('https://','').replace('http://','') + '</b>';
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
    return '<figure class="media"><video controls preload="metadata" playsinline src="'+m.src+'"></video>'
      + '<figcaption>'+m.caption+' <span class="credit">'+m.credit+'</span></figcaption></figure>';
  }
  return '<figure class="media"><img src="'+m.src+'" alt="'+m.caption+'" loading="lazy">'
    + '<figcaption>'+m.caption+' <span class="credit">'+m.credit+'</span></figcaption></figure>';
}
function roleLine(i){ return '<div class="role">Dans cette scène, vous êtes '+ROLES[i]+'.</div>'; }
function bars(){
  const tot = S.total || 0;
  return '<div class="bars">' + [0,1,2].map(j=>{
    const v = S.votes[j] || 0, w = pct(v,tot);
    return '<div class="brow"><span class="lab">'+'ABC'[j]+'</span><span class="track"><span class="fill" style="width:'+w+'%"></span></span><span class="val">'+v+' · '+w+'%</span></div>';
  }).join('') + '</div>';
}

function render(){
  const st = S.step, ph = S.phase;

  if (ph === 'intro') {
    const it = INTRO[S.intro || 0] || INTRO[0];
    $('#clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = \`
      <div class="kicker">\${it.k} · \${(S.intro||0)+1} sur \${INTRO.length}</div>
      <h1>\${it.h}</h1>
      \${it.p.map(x=>'<p>'+x+'</p>').join('')}
      \${media(it.media, true)}
      <div class="row" style="margin-top:16px">
        <button class="btn ghost" onclick="chap(\${(S.intro||0)-1})" \${(S.intro||0)===0?'disabled':''}>Précédent</button>
        \${(S.intro||0) < INTRO.length-1
          ? '<button class="btn" onclick="chap('+((S.intro||0)+1)+')">Suite</button>'
          : '<button class="btn" onclick="startGame()">Première question</button>'}
      </div>
            <p class="src" style="margin-top:18px">Chronologie et chiffres : fiche ARIA n°1 du ministère de l'environnement (septembre 2006).</p>\`;
    return;
  }

  if (st < 0) {
    $('#clock').textContent = 'SALLE ' + code;
    $('#main').innerHTML = \`
      <div class="join"><b>Les participants rejoignent cette adresse</b>
        <div class="code">\${code}</div>
        <div class="u">\${joinUrl}</div></div>
      <div class="kicker">Jeu de décision · vote en direct</div>
      <h1>Feyzin, 4 janvier 1966<br><em>Sept décisions avant l'aube</em></h1>
      <p>Chaque étape est votée en salle. L'histoire bascule selon la majorité : ce que vous choisissez devient la suite, pas seulement un score.</p>
      <div class="row" style="margin-top:18px">
        <button class="btn" onclick="send({type:'chapter',i:0})">Commencer l'introduction</button>
        <span class="pill">\${S.participants} connecté(s)</span>
      </div>
<details style="margin-top:18px">
        <summary style="font-family:var(--sans);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);cursor:pointer">Notes pour l\'animateur</summary>
        <ul style="font-size:15px;margin-top:10px">
          <li>Projetez cet écran. Les participants ouvrent l\'adresse indiquée sur leur téléphone : aucun compte, rien à installer.</li>
          <li>« Commencer l\'introduction » : quatre écrans de contexte, deux minutes. Lisez-les à voix haute, ils sont écrits pour être dits.</li>
          <li>« Première question » : laissez voter trente à soixante secondes, les barres bougent en direct.</li>
          <li>« Clore le vote » : la majorité s\'affiche et sa branche s\'ouvre. Commentez, puis montrez ce qui s\'est réellement passé.</li>
          <li>« Étape suivante » : sept étapes, comptez vingt-cinq à trente-cinq minutes jusqu\'aux conclusions.</li>
          <li>Un participant déconnecté recharge la page : son vote est retrouvé.</li>
        </ul>
      </details>
      <p class="src" style="margin-top:20px">Chronologie et chiffres : fiche ARIA n°1 du ministère de l'environnement (septembre 2006).</p>\`;
    return;
  }

  const step = STEPS[st];
  if (ph === 'vote') {
    $('#clock').textContent = step.h;
    $('#main').innerHTML = \`
      <div class="kicker">Étape \${st+1} sur 7 · \${step.t}</div>
      <h1>\${step.h}</h1>
      \${roleLine(st)}
      <div class="card plain"><p>\${step.s}</p></div>
      <h2 style="margin-top:20px">\${step.q}</h2>
      \${step.o.map((o,j)=>'<div class="opt"><span class="k">'+'ABC'[j]+'</span><span>'+o.txt+'</span></div>').join('')}
      \${bars()}
      <div class="row">
        <button class="btn" onclick="send({type:'close'})">Clore le vote</button>
        <span class="pill">\${S.total} votant(s) · \${S.participants} connecté(s)</span>
      </div>\`;
    return;
  }

  if (ph === 'reveal') {
    $('#clock').textContent = step.h;
    const win = [0,1,2].reduce((a,j)=> (S.votes[j]||0) > (S.votes[a]||0) ? j : a, 0);
    const o = step.o[win];
    $('#main').innerHTML = \`
      <div class="kicker">Étape \${st+1} sur 7 · \${step.t}</div>
      <h1>\${step.h}</h1>
      \${roleLine(st)}
      \${bars()}
      \${S.total === 0
        ? '<div class="card"><h3 style="margin-top:0">Aucun vote enregistré</h3><p>Faute de vote, l’histoire suit son cours réel : la branche qui s’ouvre est celle de 1966.</p></div>'
        : '<div class="card"><h3 style="margin-top:0">Votre majorité : '+\'ABC\'[win]+', à '+pct(S.votes[win]||0,S.total)+'%</h3><p>'+o.br+'</p></div>'}
      <div class="card plain"><h3 style="margin-top:0">Ce qui s'est réellement passé le 4 janvier 1966</h3><p>\${step.real}</p></div>
      <div class="lesson"><b>Le point de sûreté</b>\${step.l}</div>
      <div class="row" style="margin-top:18px">
        <button class="btn" onclick="send({type:'next'})">\${st < 6 ? 'Étape suivante' : 'Voir les conclusions'}</button>
        <button class="btn ghost" onclick="send({type:'open',step:\${st}})" >Réouvrir le vote</button>
      </div>\`;
    return;
  }

  $('#clock').textContent = 'DÉBRIEF';
  $('#main').innerHTML = \`
    <div class="kicker">Débrief</div>
    <h1>Ce que Feyzin a changé</h1>
    \${CONCLUSIONS.map((c,i)=>'<div class="card"><h3 style="margin-top:0">'+(i+1)+'. '+c[0]+'</h3><p style="margin:0">'+c[1]+'</p></div>').join('')}
    <h2 style="margin-top:24px">Et pour nous, aujourd'hui</h2>
    <ul>
      <li><b>Dimensionner sur l'inconcevable, pas sur le plausible.</b></li>
      <li><b>Traiter les interfaces :</b> une route, une clôture, un riverain.</li>
      <li><b>Écrire la doctrine avant l'événement :</b> une soupape qui s'ouvre n'est pas une bonne nouvelle.</li>
      <li><b>Faire vivre le retour d'expérience :</b> c'est le partage qui fait barrage.</li>
      <li><b>Se méfier de la banalité :</b> les accidents majeurs commencent par une opération que tout le monde sait faire.</li>
    </ul>
    <div class="row"><button class="btn ghost" onclick="send({type:'reset'})">Nouvelle session</button></div>
    <p class="src" style="margin-top:18px">Fiche ARIA n°1, ministère chargé de l'environnement, septembre 2006 ; rapports cités : experts judiciaires, DHYCA 19 janvier 1966, service des mines de l'Isère n°05460 du 2 janvier 1967.</p>\`;
}

connect();
</script></body></html>`;

const PART = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Feyzin 1966 — votre vote</title>
<style>${BASE_CSS}</style></head><body><div class="wrap">
<div class="bar"><div class="brand">Feyzin 1966 · salle __CODE__</div><div class="clock" id="clock">CONNEXION</div></div>
<div id="main"></div></div>
<script>
const STEPS = __STEPS__;
const INTRO = __INTRO__;
const MEDIA = __MEDIA__;
const ROLES = __ROLES__;
let S = {step:-1, phase:'lobby', votes:{}, total:0, participants:0}, ws, myVote = null, myStep = -1;
let pid = localStorage.getItem('feyzin.pid');
if (!pid) { pid = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('feyzin.pid', pid); }
const code = '__CODE__';

function connect(){
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  ws = new WebSocket(proto + '://' + location.host + '/ws?room=' + code + '&role=part&pid=' + encodeURIComponent(pid));
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.type === 'state'){ S = m.state; if (S.step !== myStep){ myStep = S.step; myVote = null; } render(); }
    if (m.type === 'voted'){ myVote = m.j; render(); }
    if (m.type === 'you'){ myVote = m.j; render(); }
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

function render(){
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
      \${roleLine(S.step)}
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
    + '<p>Sept décisions, deux heures vingt, et le 4 janvier 1966 : dix-huit morts, dont onze sapeurs-pompiers, quatre-vingt-quatre blessés, mille quatre cent soixante-quinze habitations touchées.</p>'
    + '<div class="card"><h3 style="margin-top:0">Ce qui a changé après</h3><p style="margin:0">Distances d’implantation, zones dangereuses, soupapes calculées pour un incendie généralisé, moyens d’eau, plans d’urgence et retour d’expérience obligatoire : le droit français du risque industriel est né de ce matin-là.</p></div>'
    + '<p class="src">Le débriefing complet est à l’écran de salle. Fiche ARIA n°1, ministère de l’environnement, septembre 2006.</p>';
}

function vote(j){
  if (myVote === j) return;
  send({type:'vote', j, pid});
  myVote = j; render();
}
connect();
</script></body></html>`;


export { STEPS, INTRO, CONCLUSIONS, MEDIA, ROLES, ANIM, PART, BASE_CSS };
