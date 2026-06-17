export interface SondageQuestion {
  id: number;
  text: string;
  type: "single" | "multi";
  options: string[];
  points: number[];
}

export interface SondageReco {
  icon: string;
  title: string;
  desc: string;
  relatedQuestions?: number[]; // IDs des questions dont un mauvais score déclenche cette reco
}

export interface SondageConfig {
  id: string;
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  tone: "vous" | "tu";
  image: string;
  imageAlt: string;
  questions: SondageQuestion[];
  recommendations: SondageReco[];
  maxScore: number;
}

export interface UserInfo {
  prenom: string;
  email: string;
  telephone?: string;
  structure?: string;
  // Profil démographique
  sexe?: "homme" | "femme" | "non_precise";
  age?: "moins_25" | "25_35" | "35_45" | "45_plus";
  ville?: string;
  budget?: string;
  source?: string;
  urgence?: string;
}
