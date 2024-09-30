<template>
  <div class="session-erstellen">
    <h1>Session erstellen</h1>

    <!-- Eingabefeld für Sessionnamen -->
    <div class="session-name">
      <input v-model="sessionData.spielRundenName" placeholder="Sessionname eingeben" />
    </div>

    <!-- Spieler-Liste -->
    <div class="spieler-list" v-if="spieler.length > 0">
      <h2>Verfügbare Spieler</h2>
      <div class="spieler-grid">
        <div v-for="spieler in spieler" :key="spieler.spielerId" class="spieler">
          <h3>{{ spieler.name }}</h3>
          <img :src="spieler.profilePicture" alt="Profilbild" class="profilbild" />
          <div class="actions">
            <button 
              @click="addPlayerToSession(spieler.spielerId!)" 
              :disabled="addedPlayers.has(spieler.spielerId!)" 
              :class="{ 'disabled': addedPlayers.has(spieler.spielerId!) }">
              Hinzufügen
            </button>
            <button 
              @click="removePlayerFromSession(spieler.spielerId!)" 
              :disabled="!addedPlayers.has(spieler.spielerId!)" 
              :class="{ 'disabled': !addedPlayers.has(spieler.spielerId!) }">
              Entfernen
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else>Keine Spieler gefunden.</p>

    <!-- Schaltfläche zum Speichern der Session -->
    <div class="save-session">
      <button @click="saveSession">Session speichern</button>
    </div>

    <!-- Zurück zur Startseite -->
    <button @click="goHome" class="buttons">Abbrechen</button>
  </div>
</template>


<script lang="ts" setup>
// Importiere den Session-Typ
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
import { Session } from '@/Types/Session'; // Importiere das Session Interface
import { Player } from '@/Types/Player';  // Player Interface importieren

const spieler = ref<Player[]>([])
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
// Session State
const sessionData = ref<Session>({
  spielRundenName: '',          // Sessionname leer initialisieren
  spielerIds: [],       // Leere Liste von Spieler-IDs
});

// Alle Spieler abrufen
// const spieler = ref<Player[]>([
//   { spielerId: '1', name: 'Tom', profilePicture: profile1 },
//   { spielerId: '2', name: 'Weyo', profilePicture: profile2 },
//   { spielerId: '3', name: 'Jan', profilePicture: profile3 },
//   { spielerId: '4', name: 'Mathis', profilePicture: profile4 },
//   { spielerId: '5', name: 'Mobamboficker', profilePicture: profile5 },
//   { spielerId: '6', name: 'Peter Jökel', profilePicture: profile6 },
//   { spielerId: '7', name: 'Spieler 7', profilePicture: profile7 },
//   { spielerId: '8', name: 'Spieler 8', profilePicture: profile8 },
//   { spielerId: '9', name: 'Spieler 9', profilePicture: profile9 },
//   { spielerId: '10', name: 'Spieler 10', profilePicture: profile10 },
// ]);



const fetchSpieler = async () => {
  try {
    const response = await axios.get('/api/getAlleSpieler');
    const spielerArray = response.data.data;

    if (Array.isArray(spielerArray)) {
      spielerArray.forEach((spielerData: any) => {
        spieler.value.push({
          spielerId: spielerData.spielerId.id,
          name: spielerData.name,
          profilePicture: spielerData.profilePicture, // Base64-Bild
        });
      });
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Spieler:', error);
  }
};

const addedPlayers = ref<Set<string>>(new Set());

// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId: string) => {
  if (!sessionData.value.spielerIds.includes(spielerId)) {
    sessionData.value.spielerIds.push(spielerId);
    addedPlayers.value.add(spielerId); // Spieler-ID zum Set hinzufügen
  }
  console.log('Spieler hinzugefügt:', sessionData.value.spielerIds);
};

// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId: string) => {
  const index = sessionData.value.spielerIds.indexOf(spielerId);
  if (index > -1) {
    sessionData.value.spielerIds.splice(index, 1);
    addedPlayers.value.delete(spielerId); // Spieler-ID aus dem Set entfernen
  }
  console.log('Spieler entfernt:', sessionData.value.spielerIds);
};
// Session speichern
const saveSession = async () => {
  if (sessionData.value.spielRundenName && sessionData.value.spielerIds.length > 0) {
    try {
      const response = await axios.post('/api/createSpielRunde', sessionData.value);
      console.log('Session erstellt:', response.data);

      // Session-ID aus dem Backend
      sessionData.value.spielRundenId = response.data.sessionId; 

      // Zurück zur Startseite nach Speichern der Session
      router.push('/');
    } catch (error) {
      console.error('Fehler beim Erstellen der Session:', error);
    }
  } else {
    alert('Bitte gib einen Sessionnamen ein und wähle mindestens einen Spieler aus.');
  }
};

// Initialisierung - Spieler abrufen
onMounted(() => {
  fetchSpieler();
});

// Zurück zur Startseite
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.session-erstellen {
  text-align: center;
  margin-top: 50px;
}

.session-name input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  display: block;
  width: 300px;
  margin: 0 auto;
}

.spieler-list {
  margin: 20px 0;
}

.spieler-grid {
  display: grid;
  grid-template-columns: repeat(5, 150px); /* 5 Spalten, jede 120px breit */
  gap: 20px; /* Abstand zwischen den Items */
  justify-content: center; /* Zentriert das Grid innerhalb des Containers */
}

.spieler {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px; /* Breite des Containers */
  padding: 10; /* Innenabstand */
  text-align: center; /* Text zentrieren */
}

.profilbild {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px; /* Abstand unter dem Bild */
}

.actions {
  display: flex;
  flex-direction: column; /* Buttons untereinander anordnen */
  gap: 5px; /* Abstand zwischen den Buttons */
  padding-bottom: 10px;
}

.actions button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.actions button:first-child {
  background-color: #4CAF50; /* Grün für Hinzufügen */
  color: white;
}

.actions button:last-child {
  background-color: #f44336; /* Rot für Entfernen */
  color: white;
}

.actions button:hover {
  opacity: 0.8; /* Transparenz beim Hover */
}

.save-session button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-session button:hover {
  background-color: #0056b3;
}

.buttons {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  margin-top: 20px;
}

.buttons:hover {
  background-color: #0056b3;
}

.actions button.disabled {
  background-color: #ccc; /* Grauer Hintergrund für deaktivierte Buttons */
  color: #666; /* Graue Schriftfarbe */
  cursor: not-allowed; /* Zeiger wird zu einer durchgestrichenen Hand */
  opacity: 0.6; /* Leichte Transparenz */
}

</style>
