export { default as entrepriseConfig } from "./entreprise";
export { default as artisteConfig } from "./artiste";
export { default as vendeurConfig } from "./vendeur";
export { default as marqueConfig } from "./marque";
export { default as evenementConfig } from "./evenement";
export type { SondageConfig, SondageQuestion, SondageReco, UserInfo } from "./types";

import entreprise from "./entreprise";
import artiste from "./artiste";
import vendeur from "./vendeur";
import marque from "./marque";
import evenement from "./evenement";
import type { SondageConfig } from "./types";

export const sondageConfigs: Record<string, SondageConfig> = {
  entreprise,
  artiste,
  vendeur,
  marque,
  evenement,
};
