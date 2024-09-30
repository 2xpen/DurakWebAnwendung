// src/Types/Session.ts
export interface Session {
  spielRundenId?: string; // Optional, da es vom Backend vergeben wird
  spielRundenName: string; // Name der Session
  spielerIds: string[]; // Array von Spieler-IDs (string)
}
