import {Player} from "@/Types/Player";

export interface PlayerInSession extends Player {
    spielerId: string;
    durakStand: number;
}
