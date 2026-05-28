import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

export interface Lead {
  id: string;
  created_at: string;
  type: "contact" | "brief" | "sondage" | "artiste" | "entreprise" | "projet";
  status: "new" | "read" | "archived";
  data: Record<string, unknown>;
}

export interface ArtistProfile {
  nom_artiste: string;
  genre_musical: string;
  niveau: string;
  presence_digitale: string;
  besoins: string[];
  budget: string;
  description: string;
}

export interface ClientProfile {
  id: string;
  created_at: string;
  full_name: string;
  company: string | null;
  email: string;
  phone: string | null;
  status: "pending" | "active" | "suspended";
  artist_profile: ArtistProfile | null;
}

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  title: string;
  description: string | null;
  status: "en_attente" | "en_cours" | "termine" | "suspendu";
  progress: number;
  client_profiles?: Pick<ClientProfile, "full_name" | "company" | "email">;
}

export interface ProjectUpdate {
  id: string;
  created_at: string;
  project_id: string;
  title: string;
  content: string;
  progress: number | null;
  status: string | null;
  attachments: Array<{ name: string; url: string }>;
}

export interface ProjectMessage {
  id: string;
  created_at: string;
  project_id: string;
  sender_type: "client" | "agency";
  sender_name: string;
  content: string;
  read_at: string | null;
}
