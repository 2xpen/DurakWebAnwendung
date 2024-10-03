import { PlayerInSession } from "./PlayerInSession";

export interface Spielrunde {
  spielRundenId: string;
  spielRundenName: string;
  spielerInRundeAnzeigenDTOS: PlayerInSession[];
}
