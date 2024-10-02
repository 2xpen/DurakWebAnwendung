import { exec } from "child_process";
import { join } from "path";

// Pfade anpassen, je nach deiner Verzeichnisstruktur
const distFolder = join(__dirname, "frontend", "dist");
const backendPublicFolder = join(__dirname, "..", "durakWeb", "src", "main", "resources", "static"); // Beispiel Backend-Ordner

// Kommando zum Kopieren des dist-Ordners ins Backend
const copyCommand = `cp -r ${distFolder}/* ${backendPublicFolder}`;

// Führe das Kopierkommando aus
exec(copyCommand, (error, stdout, stderr) => {
  if (error) {
    
    return;
  }
  if (stderr) {
     }
 });
