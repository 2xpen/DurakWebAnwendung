import { Player } from "./Player";

export interface Session {
  spielRundenName: string;
  spielRundenId: string;
  spielerAnzeigenViewDTOS: Player[];
}
