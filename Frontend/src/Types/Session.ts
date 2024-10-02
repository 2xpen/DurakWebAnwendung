import { Player } from "./Player";

export interface Session {
  spielRundenNamen: string;
  spielrundenId: string;
  spielerListe: Player[];
}
