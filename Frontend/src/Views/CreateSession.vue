<template>
  <div class="session-erstellen">
    <h1>Session erstellen</h1>

    <!-- Eingabefeld für Sessionnamen -->
    <div class="session-name">
      <input v-model="sessionData.spielRundenNamen" placeholder="Sessionname eingeben" />
    </div>

    <!-- Eingabefeld für die Spieler-Suche (optional, kann entfernt werden) -->
    <div class="spieler-suche">
      <input v-model="searchQuery" placeholder="Spieler suchen..." />
    </div>

    <!-- Spieler-Liste -->
    <div class="spieler-list">
      <h2>Verfügbare Spieler</h2>
      <div class="spieler-grid">
        <div v-for="spieler in spieler" :key="spieler.spielerId" class="spieler">
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

    <!-- Schaltfläche zum Speichern der Session -->
    <div class="save-session">
      <button @click="saveSession">Session speichern</button>
    </div>

    <!-- Zurück zur Startseite -->
    <button @click="goHome" class="buttons">Abbrechen</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
import { Session } from '../Types/Session'; 
import { Player } from '../Types/Player';

const spieler = ref<Player[]>([]); // Hier werden die Spieler gespeichert

// Session State
const sessionData = ref<Session>({
  spielRundenNamen: '',
  spielrundenId: '', // Dieses Feld wird nicht ins Backend gesendet
  spielerListe: [],
});

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
/* (Style bleibt unverändert) */
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
