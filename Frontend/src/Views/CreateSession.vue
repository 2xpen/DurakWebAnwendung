<template>
  <div class="session-erstellen">
    <h1>Session erstellen</h1>

    <!-- Eingabefeld für Sessionnamen -->
    <div class="session-name">
      <input v-model="sessionData.spielRundenName" placeholder="Sessionname eingeben" />
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

const spieler = ref<Player[]>([]); 

const sessionData = ref<Session>({
  spielRundenName: '',
  spielrundenId: '',
  spielerListe: [],
});

const searchQuery = ref(''); 
const addedPlayerIds = ref<Set<string>>(new Set()); // Set für die hinzugefügten Spieler-IDs

// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId: string) => {
  addedPlayerIds.value.add(spielerId);
};

// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId: string) => {
  addedPlayerIds.value.delete(spielerId);
};

// Session speichern (Sessionnamen und Spieler-IDs ans Backend schicken)
const saveSession = async () => {
  if (sessionData.value.spielRundenName && addedPlayerIds.value.size > 0) {
    try {
      // Erstelle ein Objekt, das nur den Sessionnamen und die Spieler-IDs enthält
      const sessionPayload = {
        spielRundenName: sessionData.value.spielRundenName,
        spielerIds: Array.from(addedPlayerIds.value),
      };

      // Sende die Daten ans Backend
      const response = await axios.post('/api/createSpielRunde', sessionPayload);
      console.log(response)
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

const fetchSpieler = async () => {
  try {
    const response = await axios.get('/api/getAlleSpieler');
   

    // Zugriff auf das Array mit den Spielern
    const spielerArray = response.data.data;

    if (Array.isArray(spielerArray)) {
      spielerArray.forEach((spielerData: any) => {
        // Spieler zur spieler-Referenz hinzufügen
        spieler.value.push({
          spielerId: spielerData.spielerId.id,
          name: spielerData.name,
          profilePicture: spielerData.profilePicture, // Hier ist der vollständige Base64-String
        });
      });
    } else {
    
    }
    
   
  } catch (error) {
  }
};

// Aufruf der fetchPlayers Funktion beim Mounten
onMounted(() => {
  fetchSpieler(); // Spieler laden
  console.log(spieler)
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
