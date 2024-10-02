<template>
  <div class="session-erstellen">
    <h1>Session erstellen</h1>

    <!-- Eingabefeld für Sessionnamen -->
    <div class="session-name">
      <input v-model="sessionData.spielRundenNamen" placeholder="Sessionname eingeben" />
    </div>

    <!-- Eingabefeld für die Spieler-Suche -->
    <div class="spieler-suche">
      <input v-model="searchQuery" placeholder="Spieler suchen..." />
    </div>

    <!-- Spieler-Liste -->
    <div class="spieler-list" v-if="filteredSpieler.length > 0">
      <h2>Verfügbare Spieler</h2>
      <div class="spieler-grid">
        <div v-for="spieler in filteredSpieler" :key="spieler.spielerId" class="spieler">
          <h3>{{ spieler.name }}</h3>
          <img :src="spieler.profilePicture" alt="Profilbild" class="profilbild" />
          <div class="actions">
            <!-- Spieler zur Session hinzufügen -->
            <button 
              @click="addPlayerToSession(spieler.spielerId!)" 
              :disabled="addedPlayerIds.has(spieler.spielerId!)" 
              :class="{ 'disabled': addedPlayerIds.has(spieler.spielerId!) }">
              Hinzufügen
            </button>
            <!-- Spieler aus der Session entfernen -->
            <button 
              @click="removePlayerFromSession(spieler.spielerId!)" 
              :disabled="!addedPlayerIds.has(spieler.spielerId!)" 
              :class="{ 'disabled': !addedPlayerIds.has(spieler.spielerId!) }">
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import router from '../router';
import { Session } from '../Types/Session'; 
import { Player } from '../Types/Player';

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


const spieler = ref <Player[]>([])
// Session State
const sessionData = ref<Session>({
  spielRundenNamen: '',
  spielrundenId: '', // Dieses Feld wird nicht ins Backend gesendet
  spielerListe: [],
});

// const spieler = ref<Player[]>([
//   { spielerId: '1', name: 'Tom', profilePicture: profile1 },
//   { spielerId: '2', name: 'Weyo', profilePicture: profile2 },
//   { spielerId: '3', name: 'Weyo', profilePicture: profile3 },
//   { spielerId: '4', name: 'Weyo', profilePicture: profile4 },
//   { spielerId: '5', name: 'Weyo', profilePicture: profile5 },
//   { spielerId: '6', name: 'Weyo', profilePicture: profile6 },
//   { spielerId: '7', name: 'Weyo', profilePicture: profile7 },
//   { spielerId: '8', name: 'Weyo', profilePicture: profile8 },
//   { spielerId: '9', name: 'Weyo', profilePicture: profile9 },
//   { spielerId: '10', name: 'Weyo', profilePicture: profile10 },
//   // Weitere Spieler hier...
// ]);

const searchQuery = ref(''); // Suchabfrage für die Spieler
const addedPlayerIds = ref<Set<string>>(new Set()); // Set für die hinzugefügten Spieler-IDs

// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId: string) => {
  addedPlayerIds.value.add(spielerId);
  console.log('Spieler hinzugefügt:', Array.from(addedPlayerIds.value));
};

// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId: string) => {
  addedPlayerIds.value.delete(spielerId);
  console.log('Spieler entfernt:', Array.from(addedPlayerIds.value));
};

// Gefilterte Spieler basierend auf der Suchanfrage
const filteredSpieler = computed(() => {
  if (!searchQuery.value) {
    return spieler.value; // Rückgabe aller Spieler, wenn keine Suchanfrage besteht
  }
  const query = searchQuery.value.toLowerCase();
  return spieler.value.filter(spieler => spieler.name.toLowerCase().includes(query));
});

// Session speichern (Sessionnamen und Spieler-IDs ans Backend schicken)
const saveSession = async () => {
  if (sessionData.value.spielRundenNamen && addedPlayerIds.value.size > 0) {
    try {
      // Erstelle ein Objekt, das nur den Sessionnamen und die Spieler-IDs enthält
      const sessionPayload = {
        spielRundenNamen: sessionData.value.spielRundenNamen,
        spielerIds: Array.from(addedPlayerIds.value),
      };

      console.log(sessionPayload)

      // Sende die Daten ans Backend
      const response = await axios.post('/api/createSpielRunde', sessionPayload);
      console.log('Session erstellt:', response.data);

      // Zurück zur Startseite nach dem Speichern der Session
      router.push('/');
    } catch (error) {
      console.error('Fehler beim Erstellen der Session:', error);
    }
  } else {
    alert('Bitte gib einen Sessionnamen ein und wähle mindestens einen Spieler aus.');
  }
};

// Zurück zur Startseite
const goHome = () => {
  router.push('/');
};

const fetchPlayers = async () => {
  try {
    const response = await axios.get('/api/getAlleSpieler'); // Endpunkt zum Abrufen der Spieler
    spieler.value = response.data; // Setze die Spieler-Daten in die Reaktiv-Variable
    console.log('Spieler erfolgreich geladen:', spieler.value);
  } catch (error) {
    console.error('Fehler beim Laden der Spieler:', error);
  }
};

// Aufruf der fetchPlayers Funktion beim Mounten
onMounted(() => {
  fetchPlayers(); // Spieler laden
});

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

.spieler-suche input {
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
  grid-template-columns: repeat(5, 150px);
  gap: 40px;
  justify-content: center;
}

.spieler {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  padding: 10px;
  text-align: center;
}

.profilbild {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
}

.actions button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.actions button:first-child {
  background-color: #4CAF50; 
  color: white;
}

.actions button:last-child {
  background-color: #f44336; 
  color: white;
}

.actions button:hover {
  opacity: 0.8; 
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
  background-color: #ccc; 
  color: #666; 
  cursor: not-allowed; 
  opacity: 0.6; 
}
</style>
