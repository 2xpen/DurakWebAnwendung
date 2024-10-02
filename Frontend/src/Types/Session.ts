import { Player } from "./Player";

export interface Session {
  spielRundenName: string;
  spielrundenId: string;
  spielerAnzeigenViewDTOS: Player[];
}
