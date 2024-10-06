import {Player} from "./Player";
import {SpielrundeBase} from "./SpielrundeBase";

export interface SpielrundeView extends SpielrundeBase {
    spielerAnzeigenViewDTOS: Player[];
}
