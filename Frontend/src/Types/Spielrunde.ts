import { PlayerInSession } from "./PlayerInSession";

export interface Spielrunde {
  spielRundenName: string;
  spielRundenId: string;
  spielerInRundeAnzeigenDTOS: PlayerInSession[];
}
