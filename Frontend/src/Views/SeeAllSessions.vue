<template>
  <div class="sessions-view">
    <h1 class="titel">Sessions</h1>
    <div class="sessions-list" v-if="sessions.length > 0">
      <div v-for="session in sessions" :key="session.spielRundenId" class="session-row">
        <div class="session-name">
          <h3>{{ session.spielRundenName }}</h3> <!-- Name der Session -->
        </div>
        <div class="spieler-container">
          <div 
            v-for="(player, index) in getLimitedPlayers(session.spielerInRundeAnzeigenDTOS)" 
            :key="index" 
            class="spieler"
          >
            <h3>{{ player.name }}</h3>
            <img 
              :src="player.profilePicture" 
              :alt="`Profilbild von ${player.name}`" 
              class="profilbild" 
            />
          </div>
          <!-- Anzeige von "+ x mehr", wenn mehr als 4 Spieler vorhanden sind -->
          <div v-if="session.spielerInRundeAnzeigenDTOS.length > 4" class="mehr-spieler">
            +{{ session.spielerInRundeAnzeigenDTOS.length - 4 }} mehr
          </div>
        </div>
        <div class="start-button-container">
          <button @click="startSession(session)" class="start-button">Session starten</button>
        </div>
      </div>
    </div>
    <p v-else>Keine Sessions gefunden.</p>
    <button @click="goHome" class="buttons">Abbrechen</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Session } from '../Types/Session'; // Überprüfe, ob der Typ korrekt definiert ist
import router from '../router';
import { Player } from '../Types/Player';
// import profile1 from '../assets/Profilbilder/ProfilBild1.png';
// import profile3 from '../assets/Profilbilder/ProfilBild3.png';
// import profile2 from '../assets/Profilbilder/ProfilBild2.png';

const sessions = ref<Session[]>([])




// sessions.value = [
//    {
//   "spielRundenName": "Testspiel Runde 1",
//   "spielrundenId": "12345",
//   "spielerAnzeigenViewDTOS": [
//     {
//       "spielerId": "1",
//       "name": "Max Mustermann",
//       "profilePicture": profile1,
//       "durakStand": 0
//     },
//     {
//       "spielerId": "2",
//       "name": "Lisa Müller",
//       "profilePicture": profile2,
//       "durakStand": 1
//     },
//     {
//       "spielerId": "3",
//       "name": "Hans Schmidt",
//       "profilePicture": profile3,
//       "durakStand": -1
//     }
//   ]
// }
// ]

// import profile1 from '../assets/Profilbilder/ProfilBild1.png';
// import profile2 from '../assets/Profilbilder/ProfilBild2.png';
// import profile3 from '../assets/Profilbilder/ProfilBild3.png';
// import profile4 from '../assets/Profilbilder/ProfilBild4.png';
// import profile5 from '../assets/Profilbilder/ProfilBild5.png';
// import profile6 from '../assets/Profilbilder/ProfilBild6.png';
// import profile7 from '../assets/Profilbilder/ProfilBild7.png';
// import profile8 from '../assets/Profilbilder/ProfilBild8.png';
// import profile9 from '../assets/Profilbilder/ProfilBild9.png';
// import profile10 from '../assets/Profilbilder/ProfilBild10.png';

// Reaktive Variablen für Sessions
// const sessions = ref<Session[]>([
//   {
//     spielRundenNamen: "Testsession 1", // Name der ersten Session
//     spielrundenId: "1001", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "Tom", profilePicture: profile1 }, // Platzhalter für das Profilbild
//       { name: "Anna", profilePicture: profile2 },
//       { name: "Max", profilePicture: profile3 },
//       { name: "Sophia", profilePicture: profile4 }
//     ]
//   },
//   {
//     spielRundenNamen: "Testsession 2", // Name der zweiten Session
//     spielrundenId: "1002", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "Peter", profilePicture: profile5 },
//       { name: "Clara", profilePicture: profile6 }
//     ]
//   },
//   {
//     spielRundenNamen: "Testsession 3", // Name der dritten Session
//     spielrundenId: "1003", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "John", profilePicture: profile7 },
//       { name: "Emily", profilePicture: profile8 },
//       { name: "Michael", profilePicture: profile9 },
//       { name: "Sarah", profilePicture: profile10 },
//       { name: "David", profilePicture: profile1 } // Mehr als 4 Spieler, um die "+ mehr" Anzeige zu testen
//     ]
//   }
// ]);

// Navigiere zur Startseite
const goHome = () => {
  router.push('/');
};
const props = defineProps<{
  spielRundenId: string; // Typ des Props
}>();

// Funktion, um nur die ersten 4 Spieler zurückzugeben
const getLimitedPlayers = (spielerListe: Player[]): Player[] => {
  return spielerListe.slice(0, 4); // Nur die ersten 4 Spieler zurückgeben
};

// Funktion zum Abrufen der Sessions
const fetchSessions = async () => {
  try {
    const response = await axios.get('/api/getAlleSpielrundenAuswahlView'); // API-Endpunkt
    sessions.value = response.data.data; // Daten der Sessions zuweisen
  } catch (error) {
    console.error('Fehler beim Abrufen der Sessions:', error);
  }
};

// Funktion zum Starten der Session
const startSession = (session: Session) => {

    // Navigieren zur Detailseite der Session mit der spielrundenId als Parameter
    router.push({ name: 'sessionDetail', params: { spielRundenId: session.spielRundenId } });
};

// Lade die Sessions beim Mounten der Komponente
onMounted(() => {
  fetchSessions(); // Rufe die Funktion auf, um die Sessions zu laden
});
</script>

<style scoped>
.sessions-view {
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert den gesamten Inhalt */
  width: 100%;
}

.titel {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert die Session-Reihen */
  width: 100%;
}

.session-row {
  display: flex;
  align-items: center;
  justify-content: center; /* Zentriert alle Inhalte in der Session-Reihe */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  max-width: 800px; /* Maximale Breite der Session-Reihe */
  margin-bottom: 20px;
}

.session-name {
  flex-shrink: 0; /* Verhindert, dass der Name schrumpft */
  text-align: left; /* Links ausrichten */
  white-space: nowrap; /* Verhindert Zeilenumbruch */
  margin-right: 20px; /* Abstand zwischen dem Session-Namen und dem Spieler-Container */
}

.spieler-container {
  display: flex;
  justify-content: center; /* Zentriert die Spieler horizontal */
  align-items: center; /* Zentriert die Spieler vertikal */
  flex: 1; /* Stellt sicher, dass der Container flexiblen Platz einnimmt */
}

.spieler {
  margin-right: 10px; /* Abstand zwischen den Spielern */
  text-align: center; /* Text zentriert unter den Profilbildern */
}

.profilbild {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.mehr-spieler {
  font-weight: bold;
  margin-left: 5px;
}

.start-button-container {
  flex-shrink: 0; /* Verhindert, dass der Button schrumpft */
  margin-left: 20px; /* Abstand zwischen dem Spieler-Container und dem Button */
}

.start-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.start-button:hover {
  background-color: #0056b3;
}

.buttons {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
}

.buttons:hover {
  background-color: #0056b3;
}
</style>



