// src/Types/Session.ts
export interface Session {
  sessionId?: string; // Optional, da es vom Backend vergeben wird
  sessionName: string; // Name der Session
  spielerIdListe: string[]; // Array von Spieler-IDs (string)
}
