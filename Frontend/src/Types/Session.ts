import { Player } from "./Player";

export interface Session {
  spielRundenName: string;
  spielRundenId: string;
  spielerInRundeAnzeigenDTOS: Player[];
}
