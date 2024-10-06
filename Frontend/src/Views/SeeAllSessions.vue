<template>
  <div class="sessions-view">
    <h1 class="titel">Sessions</h1>
    <div v-if="sessions.length > 0" class="sessions-list">
      <div v-for="session in sessions" :key="session.spielRundenId" class="session-row">
        <div class="session-name">
          <h3>{{ session.spielRundenName }}</h3> <!-- Name der Session -->
        </div>
        <div class="spieler-container">
          <div
              v-for="(player, index) in getLimitedPlayers(session.spielerAnzeigenViewDTOS)"
              :key="index"
              class="spieler"
          >
            <h3>{{ player.name }}</h3>
            <img
                :alt="`Profilbild von ${player.name}`"
                :src="player.profilePicture"
                class="profilbild"
            />
          </div>
          <!-- Anzeige von "+ x mehr", wenn mehr als 4 Spieler vorhanden sind -->
          <div v-if="session.spielerAnzeigenViewDTOS.length > 4" class="mehr-spieler">
            +{{ session.spielerAnzeigenViewDTOS.length - 4 }} mehr
          </div>
        </div>
        <div class="start-button-container">
          <button class="start-button" @click="startSession(session)">Session starten</button>
        </div>
      </div>
    </div>
    <p v-else>Keine Sessions gefunden.</p>
    <button class="buttons" @click="goHome">Abbrechen</button>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {SpielrundeView} from '@/Types/SpielrundeView';
import router from '../router';
import {Player} from '../Types/Player';

const sessions = ref<SpielrundeView[]>([])

const goHome = () => {
  router.push('/');
};

const getLimitedPlayers = (spielerListe: Player[]): Player[] => {
  return spielerListe.slice(0, 4);
};

const fetchSessions = async () => {
  try {
    const response = await axios.get('/api/getAlleSpielrundenAuswahlView');
    sessions.value = response.data.data;
    console.log(sessions.value, "<-------empfangene session")
  } catch (error) {
    console.error('Fehler beim Abrufen der Sessions:', error);
  }
};

const startSession = (session: SpielrundeView) => {
  router.push({name: 'sessionDetail', params: {spielRundenId: session.spielRundenId}});
};


onMounted(() => {
  fetchSessions();
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



