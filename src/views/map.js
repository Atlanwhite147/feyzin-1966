/* Plan schématique de la raffinerie de Feyzin (SVG) pour le jeu de crise.
   Aucune dépendance, aucun JavaScript embarqué : la fonction renvoie une chaîne SVG. */

export function refineryMap(etat) {
  const e = (etat && typeof etat === "object") ? etat : {};

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = (v, d = 0) => (typeof v === "number" && isFinite(v)) ? v : d;
  const bool = (v, d = false) => (typeof v === "boolean") ? v : d;

  /* --- sphères --- */
  const spheresIn = Array.isArray(e.spheres) ? e.spheres : [];
  const sphereMap = new Map(spheresIn.map((s) => [String(s && s.id), s]));
  const sphereInfo = (id, defWall = 12) => {
    const s = sphereMap.get(String(id));
    return {
      wall: num(s && s.wall, defWall),
      ruptured: !!(s && s.ruptured)
    };
  };
  const sphereColor = (id) => {
    const w = sphereInfo(id).wall;
    if (w >= 40) return "#b4451f";
    if (w >= 25) return "#d9774f";
    return "#cfc7b8";
  };

  /* --- nappe --- */
  const nappe = (e.nappe && typeof e.nappe === "object") ? e.nappe : {};
  const nappeMasse = num(nappe.masse, 0);
  const nappeRayon = num(nappe.rayon, 0);
  const nappeDerive = num(nappe.derive, 0);
  /* La nappe part de la sphère 443 et s'étire vers la droite : on borne le dessin
     pour qu'il reste dans la cuvette et lisible, sans sortir du plan. */
  const nappeCx = clamp(450 + Math.min(nappeDerive, 210) * 0.42, 300, 700);
  const nappeCy = 300;
  const nappeRx = clamp(34 + nappeRayon * 0.55 + Math.min(nappeDerive, 240) * 0.22, 30, 190);
  const nappeRy = clamp(14 + nappeRayon * 0.30, 14, 66);
  const nappeOpacity = nappeMasse > 0 ? 0.28 : 0.08;

  /* --- eau --- */
  const eau = (e.eau && typeof e.eau === "object") ? e.eau : {};
  const eauStock = clamp(num(eau.stock, 100), 0, 100);
  const eauEpuisee = bool(eau.epuisee, false);
  const waterOpacity = eauEpuisee ? 0.25 : 0.35 + 0.65 * (eauStock / 100);
  const waterWidth = eauEpuisee ? 1.2 : 1 + 2.5 * (eauStock / 100);
  const waterDash = eauEpuisee ? "6 4" : "none";
  const waterColor = eauEpuisee ? "#948d83" : "#cfc7b8";

  /* --- périmètre --- */
  const perim = (e.perimetre && typeof e.perimetre === "object") ? e.perimetre : {};
  const perimRadius = clamp(num(perim.radius, 0), 0, 10000);
  const perimEvacuated = bool(perim.evacuated, false);
  const perimPx = clamp(30 + perimRadius * 1.0, 30, 290);

  /* --- A7 --- */
  const a7 = (e.a7 && typeof e.a7 === "object") ? e.a7 : {};
  const a7Closed = bool(a7.closed, false);

  /* --- secours --- */
  const sec = (e.secours && typeof e.secours === "object") ? e.secours : {};
  const secDist = clamp(num(sec.distance, 250), 0, 10000);
  const secWithdrawn = bool(sec.withdrawn, false);
  const secPx = clamp(secDist * 1.1, 0, 420);
  const secX = clamp(450 + secPx * Math.cos(0.5), 20, 880);
  const secY = clamp(260 - secPx * Math.sin(0.5), 20, 500);

  /* --- helpers rendu sphère --- */
  const sphereSvg = (id, x, y) => {
    const info = sphereInfo(id);
    const color = info.ruptured ? "#948d83" : sphereColor(id);
    const hatch = info.ruptured
      ? `<circle cx="${x}" cy="${y}" r="52" fill="url(#hatch)" opacity="0.55"/>`
      : "";
    return `
      <g class="sphere">
        <line x1="${x - 22}" y1="${y + 50}" x2="${x - 32}" y2="${y + 98}" class="trait" stroke-width="1.6"/>
        <line x1="${x - 7}" y1="${y + 52}" x2="${x - 12}" y2="${y + 98}" class="trait" stroke-width="1.6"/>
        <line x1="${x + 7}" y1="${y + 52}" x2="${x + 12}" y2="${y + 98}" class="trait" stroke-width="1.6"/>
        <line x1="${x + 22}" y1="${y + 50}" x2="${x + 32}" y2="${y + 98}" class="trait" stroke-width="1.6"/>
        <line x1="${x - 40}" y1="${y + 98}" x2="${x + 40}" y2="${y + 98}" class="trait" stroke-width="2"/>
        <circle cx="${x}" cy="${y}" r="52" fill="#08080a" stroke="${color}" stroke-width="2.6"/>
        ${hatch}
        <text x="${x}" y="${y + 6}" text-anchor="middle" class="txt2" font-size="15" font-weight="bold">${id}</text>
        <text x="${x}" y="${y + 118}" text-anchor="middle" class="txt" font-size="11">SPHÈRE ${id}</text>
      </g>`;
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" style="" role="img" aria-label="Plan schématique de la raffinerie de Feyzin">
  <defs>
    <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" class="ruptured-hatch" stroke-width="1.4"/>
    </pattern>
  </defs>
  <style>
    .bg { fill: #08080a; }
    .trait { stroke: #cfc7b8; fill: none; }
    .sec { stroke: #948d83; fill: none; }
    .txt { fill: #948d83; font-family: Helvetica, Arial, sans-serif; }
    .txt2 { fill: #cfc7b8; font-family: Helvetica, Arial, sans-serif; }
    .accent { fill: #b4451f; }
    .accent2 { fill: #d9774f; }
    .nappe { fill: #b4451f; }
    .water { stroke: ${waterColor}; fill: none; }
    .perim { stroke: #948d83; fill: none; }
    .ruptured-hatch { stroke: #c0392b; }
    .rail { stroke: #cfc7b8; fill: none; }
  </style>

  <!-- fond -->
  <rect x="0" y="0" width="900" height="520" class="bg"/>

  <!-- voie ferrée -->
  <line x1="0" y1="58" x2="900" y2="58" class="rail" stroke-width="1.6"/>
  <line x1="0" y1="70" x2="900" y2="70" class="rail" stroke-width="1.6"/>
  ${Array.from({ length: 23 }, (_, i) => `<line x1="${i * 40 + 10}" y1="58" x2="${i * 40 + 10}" y2="70" class="sec" stroke-width="1"/>`).join("")}
  <text x="12" y="48" class="txt" font-size="10" letter-spacing="2">VOIE FERRÉE</text>

  <!-- poste de garde -->
  <rect x="60" y="440" width="74" height="46" class="trait" stroke-width="1.6"/>
  <line x1="60" y1="458" x2="134" y2="458" class="trait" stroke-width="1"/>
  <text x="97" y="434" text-anchor="middle" class="txt" font-size="10">POSTE DE GARDE</text>

  <!-- nappe de gaz -->
  <ellipse cx="${nappeCx}" cy="${nappeCy}" rx="${nappeRx}" ry="${nappeRy}" class="nappe" opacity="${nappeOpacity}" stroke="#d9774f" stroke-width="1.2"/>
  ${nappeMasse > 0 ? `<text x="12" y="300" class="accent2" font-size="11">NAPPE ${Math.round(nappeMasse).toLocaleString("fr-FR")} kg · ${Math.round(nappeRayon)} m</text>` : ""}

  <!-- cuvette de rétention -->
  <rect x="200" y="170" width="500" height="210" rx="22" ry="22" class="sec" stroke-width="1.8" stroke-dasharray="8 5"/>
  <text x="450" y="162" text-anchor="middle" class="txt" font-size="11" letter-spacing="2">CUVETTE DE RÉTENTION</text>

  <!-- sphères -->
  ${sphereSvg("442", 300, 245)}
  ${sphereSvg("443", 450, 245)}
  ${sphereSvg("441", 600, 245)}

  <!-- réseau d'eau incendie -->
  <line x1="30" y1="345" x2="870" y2="345" class="water" stroke-width="${waterWidth}" stroke-dasharray="${waterDash}" opacity="${waterOpacity}"/>
  ${[300, 450, 600].map((x) => `<line x1="${x}" y1="345" x2="${x}" y2="300" class="water" stroke-width="${waterWidth}" stroke-dasharray="${waterDash}" opacity="${waterOpacity}"/>`).join("")}
  ${Array.from({ length: 7 }, (_, i) => {
    const x = 90 + i * 120;
    return `<rect x="${x - 6}" y="339" width="12" height="12" class="water" stroke-width="1.4" opacity="${waterOpacity}" fill="#08080a"/>`;
  }).join("")}
  <text x="30" y="335" class="txt" font-size="10">RÉSEAU EAU INCENDIE</text>
  ${eauEpuisee ? `<text x="870" y="335" text-anchor="end" class="accent" font-size="10">ÉPUISÉ</text>` : `<text x="870" y="335" text-anchor="end" class="txt" font-size="10">STOCK ${Math.round(eauStock)} %</text>`}

  <!-- périmètre de sécurité -->
  ${perimRadius >= 60 ? `<circle cx="450" cy="260" r="${perimPx}" class="perim" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.85"/>` : ""}
  ${perimRadius >= 60 ? (() => {
    const haut = 260 - perimPx - 10;
    const y = haut >= 20 ? haut : clamp(260 + perimPx + 20, 16, 466);
    return `<text x="${clamp(450, 60, 840)}" y="${clamp(y, 16, 466)}" text-anchor="middle" class="txt" font-size="11">PÉRIMÈTRE ${Math.round(perimRadius)} m${perimEvacuated ? " · ÉVACUÉ" : ""}</text>`;
  })() : ""}


  <!-- secours -->
  <g class="secours" opacity="${secWithdrawn ? 0.35 : 1}">
    <circle cx="${secX}" cy="${secY}" r="7" class="trait" stroke-width="1.6" fill="#08080a"/>
    <line x1="${secX}" y1="${secY + 7}" x2="${secX}" y2="${secY + 24}" class="trait" stroke-width="1.6"/>
    <line x1="${secX}" y1="${secY + 14}" x2="${secX - 9}" y2="${secY + 20}" class="trait" stroke-width="1.4"/>
    <line x1="${secX}" y1="${secY + 14}" x2="${secX + 9}" y2="${secY + 20}" class="trait" stroke-width="1.4"/>
    <line x1="${secX}" y1="${secY + 24}" x2="${secX - 7}" y2="${secY + 34}" class="trait" stroke-width="1.4"/>
    <line x1="${secX}" y1="${secY + 24}" x2="${secX + 7}" y2="${secY + 34}" class="trait" stroke-width="1.4"/>
  </g>
  <text x="${clamp(secX, 10, 880)}" y="${clamp(secY - 12, 14, 506)}" text-anchor="middle" class="txt" font-size="10">SECOURS ${Math.round(secDist)} m</text>
  ${secWithdrawn ? `<text x="${clamp(secX, 10, 880)}" y="${clamp(secY + 46, 14, 506)}" text-anchor="middle" class="accent" font-size="10">REPLI</text>` : ""}

  <!-- autoroute A7 -->
  <line x1="0" y1="490" x2="900" y2="490" class="trait" stroke-width="2.4"/>
  <line x1="0" y1="508" x2="900" y2="508" class="trait" stroke-width="2.4"/>
  <line x1="0" y1="499" x2="900" y2="499" class="sec" stroke-width="1.2" stroke-dasharray="12 10"/>
  <text x="12" y="484" class="txt" font-size="10" letter-spacing="2">AUTOROUTE</text>
  <text x="742" y="486" text-anchor="end" class="txt2" font-size="13" font-weight="bold">A7</text>
  <text x="752" y="486" class="${a7Closed ? "accent" : "txt"}" font-size="11" font-weight="bold">${a7Closed ? "COUPÉE" : "OUVERTE"}</text>
  ${a7Closed ? `<line x1="420" y1="488" x2="480" y2="508" class="accent" stroke-width="3"/><line x1="480" y1="488" x2="420" y2="508" class="accent" stroke-width="3"/>` : ""}

  <!-- titre -->
  <text x="12" y="24" class="txt" font-size="12" letter-spacing="3">FEYZIN 1966 · PLAN DU SITE</text>
</svg>`;
}
