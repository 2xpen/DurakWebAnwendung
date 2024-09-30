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
        </template>
        <Allert
          v-if="showAllert"
          :title="allertTitle"
          :message="allertMessage"
          :isVisible="showAllert"
          @close="showAllert = false"
        />
      </div>
    </div>

    <div class="navigation-buttons">
      <button @click="SaveAndHome" class="buttons">Speichern und Zurück</button>
      <button @click="goHome" class="buttons">Abbrechen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Player } from '../Types/Player';
import router from '../router';
import Allert from '../components/Allert.vue'; 
import $ from 'jquery';

const playerName = ref<string>('');
const selectedProfilePicture = ref<string | null>(null);
const showAllert = ref(false); // Steuere die Sichtbarkeit des Allerts
const allertTitle = ref('');
const allertMessage = ref('');

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


// Funktion zur Umwandlung der Bild-URL in ein Base64-Bild
const getBase64Image = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous'; // Wichtig für die CORS-Politik

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/png'); // Hier kannst du das gewünschte Format angeben
      resolve(base64); // Gebe das gesamte Base64-Format zurück
    };

    img.onerror = (error) => reject(error);
  });
};


const selectProfilePicture = (picture: string) => {
  selectedProfilePicture.value = picture;
  console.log(selectedProfilePicture.value, "selected ProfilePicture")
};

const goHome = () => {
  playerName.value = ''; // Zurücksetzen des Spielernamens
  selectedProfilePicture.value = null; // Zurücksetzen des Profilbilds
  router.push('/'); // Navigiere zur Startseite
}

const SaveAndHome = async () => {
  if (playerName.value && selectedProfilePicture.value) {
    // Hier verwenden wir das ausgewählte Profilbild direkt
    const base64Image = await getBase64Image(selectedProfilePicture.value); // Verwende die URL, um das Bild in Base64 umzuwandeln

    const newPlayer: Player = {
      name: playerName.value,
      profilePicture: base64Image, // Verwende den Base64-String direkt
    };
    
    const playerJson = JSON.stringify(newPlayer);

    $.ajax({
      url: '/api/createSpieler',
      method: 'POST',
      contentType: 'application/json', 
      data: playerJson, 
      dataType: 'json',
    }).done((response: any) => {
      console.log('Erfolg:', response);
      console.log(response.statusIndicator);
    }).fail((jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) => {
      console.error('Fehler:', textStatus, errorThrown); 
    });

    console.log("json-Object Spieler", playerJson); 

    // Setze den Alert-Text und zeige ihn an
    allertTitle.value = `Spieler ${playerName.value} erstellt!`;
    allertMessage.value = `Spieler ${playerName.value} mit Profilbild erstellt!`;
    showAllert.value = true;

    // Warten auf das Schließen des Alerts
    await new Promise<void>((resolve) => {
      const closeAlert = () => {
        showAllert.value = false; // Setze showAllert zurück
        resolve(); // Auflösen des Promises
      };

      watch(showAllert, (newValue) => {
        if (!newValue) {
          closeAlert();
        }
      });
    });

    // Nach dem Schließen des Alerts zur Startseite navigieren
    playerName.value = ''; 
    selectedProfilePicture.value = null; 
    router.push('/');
  } else {
    // Fehler-Alert
    allertTitle.value = 'Fehler';
    allertMessage.value = 'Bitte einen Spielernamen und ein Profilbild auswählen!';
    showAllert.value = true;

    // Warten auf das Schließen des Alerts
    await new Promise<void>((resolve) => {
      const closeAlert = () => {
        showAllert.value = false; // Setze showAllert zurück
        resolve(); // Auflösen des Promises
      };

      watch(showAllert, (newValue) => {
        if (!newValue) {
          closeAlert();
        }
      });
    });
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
  width: 301px;
  margin: 0 auto;
}

.profile-pictures {
  margin: 20px 0;
  display: flex; /* Flexbox für den Container */
  justify-content: center; /* Zentriert die Bilder */
}

.pictures {
  display: grid;
  grid-template-columns: repeat(5, 54px); /* Hier 5 Spalten für die Bilder */
  gap: 10px; /* Abstand zwischen den Bildern */
  justify-items: center; /* Zentriert die Bilder */
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
