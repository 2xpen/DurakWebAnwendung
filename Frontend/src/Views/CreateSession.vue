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
      <div v-for="spieler in spieler" :key="spieler.spielerId" class="spieler">
        <h3>{{ spieler.name }}</h3>
        <img :src="spieler.profilePicture" alt="Profilbild" class="profilbild" />
        <div class="actions">
          <button @click="addPlayerToSession(spieler.spielerId!)">Hinzufügen</button>
          <button @click="removePlayerFromSession(spieler.spielerId!)">Entfernen</button>
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

// Session State
const sessionData = ref<Session>({
  spielRundenName: '',          // Sessionname leer initialisieren
  spielerIds: [],       // Leere Liste von Spieler-IDs
});

// Alle Spieler abrufen
const spieler = ref<Player[]>([]);

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

// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId: string) => {
  if (!sessionData.value.spielerIds.includes(spielerId)) {
    sessionData.value.spielerIds.push(spielerId);
  }
  console.log('Spieler hinzugefügt:', sessionData.value.spielerIds);
};

// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId: string) => {
  const index = sessionData.value.spielerIds.indexOf(spielerId);
  if (index > -1) {
    sessionData.value.spielerIds.splice(index, 1);
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

.spieler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.profilbild {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.actions button {
  margin-left: 10px;
  padding: 8px 12px;
  cursor: pointer;
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
</style>
