"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = require("path");
// Pfade anpassen, je nach deiner Verzeichnisstruktur
var distFolder = (0, path_1.join)(__dirname, "frontend", "dist");
var backendPublicFolder = (0, path_1.join)(__dirname, "..", "durakWeb", "src", "main", "resources", "static"); // Beispiel Backend-Ordner
console.log("Frontend dist path: ".concat(distFolder));
console.log("Backend public path: ".concat(backendPublicFolder));
// Kommando zum Kopieren des dist-Ordners ins Backend
var copyCommand = "cp -r ".concat(distFolder, "/* ").concat(backendPublicFolder);
// Führe das Kopierkommando aus
(0, child_process_1.exec)(copyCommand, function (error, stdout, stderr) {
    if (error) {
        console.error("Fehler beim Kopieren des dist-Ordners: ".concat(error));
        return;
    }
    if (stderr) {
        console.error("stderr: ".concat(stderr));
    }
    console.log("stdout: ".concat(stdout));
});
