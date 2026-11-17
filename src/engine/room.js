/* Machine à états d'une salle, indépendante du transport.
   Utilisée par le serveur Node et par le Durable Object Cloudflare : une seule vérité. */

import { POSTES } from "../content.js";
import { newGame, jouer, resume, debrief as debriefDe, evaluateEnding, tension } from "./index.js";

export function salleVide() {
  return {
    step: -1,
    phase: "lobby",
    intro: 0,
    votes: {},
    voters: {},
    participants: {},
    sim: null,
    fin: null,
    verrou: null
  };
}

const propre = (s, max = 40) => String(s || "").slice(0, max);
const nomPropre = (s) => String(s || "").trim().replace(/[<>]/g, "").slice(0, 22);

export function rejoindre(salle, pid, nom) {
  pid = propre(pid);
  nom = nomPropre(nom);
  if (!pid || !nom) return null;
  salle.participants = salle.participants || {};
  const pris = new Set(Object.values(salle.participants).map((p) => p.poste));
  let poste = POSTES.find((x) => !pris.has(x));
  if (!poste) {
    const k = Object.keys(salle.participants).length - POSTES.length + 1;
    poste = POSTES[k % POSTES.length] + " (équipe " + (k + 1) + ")";
  }
  salle.participants[pid] = { name: nom, poste };
  return salle.participants[pid];
}

export function voter(salle, pid, choix) {
  pid = propre(pid);
  if (salle.phase !== "vote" || salle.step < 0) return false;
  if (!pid || typeof choix !== "number" || choix < 0 || choix > 2) return false;
  const avant = salle.voters[pid];
  if (avant === choix) return false;
  if (avant !== undefined) {
    const reste = Math.max(0, (salle.votes[avant] || 1) - 1);
    if (reste === 0) delete salle.votes[avant];
    else salle.votes[avant] = reste;
  }
  salle.voters[pid] = choix;
  salle.votes[choix] = (salle.votes[choix] || 0) + 1;
  return true;
}

export function majorite(salle) {
  const t = [0, 1, 2].map((j) => salle.votes[j] || 0);
  const max = Math.max(...t);
  if (max === 0) return null;
  return t.indexOf(max);
}

/* Commandes de l'animateur. Retourne true si l'état a changé. */
export function commander(salle, type, charge = {}, scenario, physics) {
  switch (type) {
    case "open":
      salle.step = Math.max(0, Math.min((scenario?.etapes.length || 7) - 1, charge.step ?? 0));
      salle.votes = {};
      salle.voters = {};
      salle.phase = "vote";
      return true;
    case "close":
      if (salle.phase !== "vote") return false;
      salle.phase = "reveal";
      return true;
    case "next":
      if (salle.step < (scenario?.etapes.length || 7) - 1) {
        salle.step += 1;
        salle.votes = {};
        salle.voters = {};
        salle.phase = "vote";
      } else {
        salle.phase = "end";
      }
      return true;
    case "back":
      if (salle.step > 0) {
        salle.step -= 1;
        salle.votes = {};
        salle.voters = {};
        salle.phase = "vote";
        return true;
      }
      return false;
    case "chapter":
      salle.phase = "intro";
      salle.intro = Math.max(0, Math.min(2, charge.i ?? 0));
      return true;
    case "reset":
      Object.assign(salle, salleVide());
      return true;
    default:
      return false;
  }
}

/* Applique la majorité de la salle au moteur, si une simulation est en cours. */
export function appliquerMajorite(salle, scenario, physics) {
  if (!salle.sim) return null;
  /* Personne n'a voté : on suit la branche historique plutôt que de figer la simulation.
     La salle voit ainsi les indicateurs évoluer à chaque étape. */
  const choix = majorite(salle) ?? 1;
  const jeu = jouer(salle.sim, choix);
  salle.sim = { ...salle.sim, ...jeu };
  salle.fin = salle.sim.fin;
  return choix;
}

export function demarrerSimulation(salle, physics, scenario) {
  salle.sim = newGame(physics, scenario);
  salle.fin = null;
  return salle.sim;
}

/* État public diffusé aux écrans. Ne contient que ce qui se voit. */
export function etatPublic(salle, physics) {
  const total = Object.values(salle.votes).reduce((a, b) => a + b, 0);
  const base = {
    step: salle.step,
    phase: salle.phase,
    intro: salle.intro || 0,
    votes: salle.votes,
    total,
    participants: Object.keys(salle.participants || {}).length,
    roster: Object.values(salle.participants || {}).map((p) => ({ name: p.name, poste: p.poste })),
    majorite: majorite(salle)
  };
  if (salle.sim && physics) {
    base.crise = resume(salle.sim);
    base.tension = tension(salle.sim.state, physics);
    base.criseJournal = salle.sim.state.log.slice(-8);
    base.fin = salle.sim.fin || null;
  }
  if (salle.sim) {
    base.debrief = debriefDe(salle.sim);
  }
  base.fin = base.fin || salle.fin || (salle.sim ? evaluateEnding(salle.sim.state, physics) : null);
  return base;
}
