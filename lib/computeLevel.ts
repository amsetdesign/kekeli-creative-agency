export interface ArtistLevel {
  level: 1 | 2 | 3 | 4;
  label: string;
  emoji: string;
  color: string;
  progress: number;
  nextLabel: string;
  score: number;
  nextCriteria: string[];
}

interface ProfileInput {
  nom_artiste?: string;
  genre_musical?: string;
  niveau?: string;
  besoins?: string[];
  description?: string;
  presence_digitale?: string;
}

export function computeLevel(
  artistProfile: ProfileInput | null,
  totalProjects: number,
  completedProjects: number,
): ArtistLevel {
  let score = 0;

  // Profile completeness — max 35 pts (objective, not self-reported)
  if (artistProfile?.nom_artiste)                            score += 8;
  if (artistProfile?.genre_musical)                          score += 7;
  if ((artistProfile?.besoins?.length ?? 0) >= 3)           score += 8;
  if ((artistProfile?.description?.length ?? 0) >= 80)      score += 7;
  if (artistProfile?.presence_digitale)                      score += 5;

  // Projects — max 45 pts
  score += Math.min(totalProjects * 6, 24);      // up to 4 projects × 6
  score += Math.min(completedProjects * 7, 21);  // up to 3 completed × 7

  // Thresholds: 0–19 = L1, 20–39 = L2, 40–59 = L3, 60+ = L4

  function base(
    level: 1 | 2 | 3 | 4,
    label: string,
    emoji: string,
    color: string,
    nextLabel: string,
    min: number,
    max: number,
    nextCriteria: string[],
  ): ArtistLevel {
    const progress = max > 0 ? Math.min(Math.round(((score - min) / (max - min)) * 100), 100) : 100;
    return { level, label, emoji, color, progress, nextLabel, score, nextCriteria };
  }

  if (score >= 60) return base(4, "Elite Artist", "👑", "#C8A84B", "", 60, 80,
    []);

  if (score >= 40) return base(3, "Pro Artist", "💎", "#8B5CF6", "Elite Artist", 40, 60,
    [
      ...(!(artistProfile?.nom_artiste && artistProfile?.genre_musical && (artistProfile?.besoins?.length ?? 0) >= 3 && (artistProfile?.description?.length ?? 0) >= 80 && artistProfile?.presence_digitale)
        ? ["Complétez à 100% votre profil artiste"] : []),
      ...(completedProjects < 2 ? [`Terminez ${2 - completedProjects} projet${2 - completedProjects > 1 ? "s" : ""} avec l'agence`] : []),
      ...(totalProjects < 3 ? [`Démarrez ${3 - totalProjects} nouveau${3 - totalProjects > 1 ? "x" : ""} projet${3 - totalProjects > 1 ? "s" : ""}`] : []),
    ]);

  if (score >= 20) return base(2, "Rising Artist", "⭐", "#4C9BFF", "Pro Artist", 20, 40,
    [
      ...(!artistProfile?.nom_artiste ? ["Renseignez votre nom d'artiste"] : []),
      ...(!artistProfile?.genre_musical ? ["Renseignez votre genre musical"] : []),
      ...((artistProfile?.besoins?.length ?? 0) < 3 ? ["Sélectionnez au moins 3 services souhaités"] : []),
      ...((artistProfile?.description?.length ?? 0) < 80 ? ["Rédigez une description de projet (80+ caractères)"] : []),
      ...(totalProjects < 1 ? ["Démarrez un premier projet avec l'agence"] : []),
    ]);

  return base(1, "Artiste Émergent", "🌱", "#10B981", "Rising Artist", 0, 20,
    [
      ...(!artistProfile?.nom_artiste ? ["Renseignez votre nom d'artiste"] : []),
      ...(!artistProfile?.genre_musical ? ["Renseignez votre genre musical"] : []),
      ...((artistProfile?.besoins?.length ?? 0) < 3 ? ["Sélectionnez au moins 3 services souhaités"] : []),
      ...((artistProfile?.description?.length ?? 0) < 80 ? ["Rédigez une description de votre projet"] : []),
    ]);
}
