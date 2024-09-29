<template>
  <div class="create-player">
    <h2>Neuen Spieler erstellen</h2>
    <input v-model="playerName" placeholder="Spielername eingeben" />

    <div class="profile-pictures">
      <div class="pictures">
        <template v-for="(picture, index) in profilePictures" :key="index">
          <img
            :src="picture"
            alt="Profilbild"
            @click="selectProfilePicture(picture)"
            :class="['profile-img', { selected: selectedProfilePicture === picture }]"
          />
          <!-- Zeilenumbruch nach dem 5. Bild -->
          <br v-if="(index  + 1) % 5 === 0" />
        </template>
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="SaveAndHome" class="buttons">Speichern und Zurück</button>
      <button @click="goHome" class="buttons">Abbrechen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Player } from '../Types/Player';
import router from '../router';

const playerName = ref<string>('');
const selectedProfilePicture = ref<string | null>(null);

// Profilbilder importieren
import profile1 from '../assets/Profilbilder/ProfilBild1.png';
import profile2 from '../assets/Profilbilder/ProfilBild2.png';
import profile3 from '../assets/Profilbilder/ProfilBild3.png';
import profile4 from '../assets/Profilbilder/ProfilBild4.png';
import profile5 from '../assets/Profilbilder/ProfilBild5.png';
import profile6 from '../assets/Profilbilder/ProfilBild6.png';
import profile7 from '../assets/Profilbilder/ProfilBild7.png';
import profile8 from '../assets/Profilbilder/ProfilBild8.png';
import profile9 from '../assets/Profilbilder/ProfilBild9.png';
import profile10 from '../assets/Profilbilder/ProfilBild10.png';

// Array mit Profilbildern
const profilePictures = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
  profile9,
  profile10
];

// Funktion zur Auswahl des Profilbildes
const selectProfilePicture = (picture: string) => {
  selectedProfilePicture.value = picture;
};

// Funktion zur Umwandlung des Bildes in Base64
const toBase64 = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([file]));
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const goHome = () => {
  playerName.value = ''; // Zurücksetzen des Spielernamens
  selectedProfilePicture.value = null; // Zurücksetzen des Profilbilds
  router.push('/'); // Navigiere zur Startseite
}

const SaveAndHome = async () => {
  if (playerName.value && selectedProfilePicture.value) {
    // Umwandlung in Base64
    const base64Image = await toBase64(selectedProfilePicture.value);

    // Erstelle ein Player-Objekt
    const newPlayer: Player = {
      name: playerName.value,
      profilePicture: base64Image,
    };

    // Wandelt das Player-Objekt in ein JSON-Objekt um
    const playerJson = JSON.stringify(newPlayer);

    // Hier kannst du den API-Call hinzufügen, um das JSON-Objekt zu speichern
    console.log(playerJson); // Zum Debuggen, um das JSON-Objekt in der Konsole zu sehen




    alert(`Spieler ${playerName.value} mit Profilbild erstellt!`);
    playerName.value = ''; // Zurücksetzen des Spielernamens
    selectedProfilePicture.value = null; // Zurücksetzen des Profilbilds
    router.push('/'); // Navigiere zur Startseite
  } else {
    alert('Bitte einen Spielernamen und ein Profilbild auswählen!');
  }
};
</script>

<style scoped>
.create-player {
  text-align: center;
  margin-top: 50px;
}

input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  display: block;
  width: 300px;
  margin: 0 auto;
}

.profile-pictures {
  margin: 20px 0;
  display: flex; /* Verwende Flexbox für den Container */
  justify-content: center; /* Zentriert die Bilder */
}

.pictures {
  display: grid;
  grid-template-columns: repeat(5, 50px); /* Setze die Breite der Spalten auf 50px */
  gap: 5px; /* Abstand zwischen den Bildern */
}

.profile-img {
  width: 50px; 
  height: 50px; 
  cursor: pointer;
  border: 2px solid transparent;
  object-fit: cover; 
  margin: 0; /* Kein zusätzlicher Abstand */
}

.profile-img:hover {
  border-color: blue; /* Farbe beim Hover-Effekt */
}

.selected {
  border-color: blue; /* Farbe für das ausgewählte Bild */
}

.navigation-buttons {
  display: flex;
  justify-content: center; /* Zentriert die Buttons */
  margin-top: 30px; /* Abstand über den Buttons */
}

.buttons {
  padding: 10px 20px; /* Reduziertes Padding für kleinere Buttons */
  font-size: 16px; /* Kleinere Schriftgröße */
  cursor: pointer;
  border: none; /* Entfernt den Standardrahmen */
  border-radius: 5px; /* Abgerundete Ecken für die Buttons */
  background-color: #007bff; /* Hintergrundfarbe für die Buttons */
  color: white; /* Schriftfarbe */
  margin: 0 10px; /* Abstand zwischen den Buttons */
  transition: background-color 0.3s; /* Sanfte Übergänge */
}

.buttons:hover {
  background-color: #0056b3; /* Dunklere Farbe beim Hover */
}
</style>




