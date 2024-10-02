import { exec } from "child_process";
import { join } from "path";

// Pfade anpassen, je nach deiner Verzeichnisstruktur
const distFolder = join(__dirname, "frontend", "dist");
const backendPublicFolder = join(__dirname, "..", "durakWeb", "src", "main", "resources", "static"); // Beispiel Backend-Ordner

console.log(`Frontend dist path: ${distFolder}`);
console.log(`Backend public path: ${backendPublicFolder}`);


// Kommando zum Kopieren des dist-Ordners ins Backend
const copyCommand = `cp -r ${distFolder}/* ${backendPublicFolder}`;

// Führe das Kopierkommando aus
exec(copyCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Fehler beim Kopieren des dist-Ordners: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
