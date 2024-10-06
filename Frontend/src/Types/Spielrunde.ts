import {PlayerInSession} from "./PlayerInSession";
import {SpielrundeBase} from "@/Types/SpielrundeBase";

export interface Spielrunde extends SpielrundeBase {
    spielerInRundeAnzeigenDTOS: PlayerInSession[];
}
