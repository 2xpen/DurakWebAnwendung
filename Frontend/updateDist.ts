import * as fs from "fs";
import * as path from "path";

const oldDistPath = path.join(__dirname, "dist"); // Alter dist-Ordner
const newDistPath = path.join(__dirname, "neuerDist"); // Neuer dist-Ordner

// Lösche den alten Dist-Ordner
if (fs.existsSync(oldDistPath)) {
  fs.rmSync(oldDistPath, { recursive: true, force: true });
}

// Kopiere den neuen Dist-Ordner
if (fs.existsSync(newDistPath)) {
  fs.renameSync(newDistPath, oldDistPath);
  console.log("Dist-Ordner aktualisiert.");
} else {
  console.error("Neuer Dist-Ordner existiert nicht.");
}
