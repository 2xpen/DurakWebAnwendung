"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var oldDistPath = path.join(__dirname, "dist"); // Alter dist-Ordner
var newDistPath = path.join(__dirname, "neuerDist"); // Neuer dist-Ordner
// Lösche den alten Dist-Ordner
if (fs.existsSync(oldDistPath)) {
    fs.rmSync(oldDistPath, { recursive: true, force: true });
}
// Kopiere den neuen Dist-Ordner
if (fs.existsSync(newDistPath)) {
    fs.renameSync(newDistPath, oldDistPath);
    console.log("Dist-Ordner aktualisiert.");
}
else {
    console.error("Neuer Dist-Ordner existiert nicht.");
}
