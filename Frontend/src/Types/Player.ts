// src/types/Player.ts


//sollte eher baseklasse werden , der Entwickler wusste nur nicht recht wie man das elegant macht
export interface Player {
    spielerId?: string
    name: string;
    profilePicture: string;
}
