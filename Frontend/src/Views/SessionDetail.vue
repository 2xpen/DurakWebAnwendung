<template>
  <div class="session-detail">
    <h1 class="session-title">{{ session?.spielRundenName }}</h1>
    
    <div class="spieler-container">
      <div 
        v-for="player in session?.spielerAnzeigenViewDTOS" 
        :key="player.spielerId" 
        class="spieler"
      >
        <h3>{{ player.name }}</h3>
        <h3>{{ player.durakStand }}</h3>
        <img 
          :src="player.profilePicture" 
          :alt="`Profilbild von ${player.name}`" 
          class="profilbild" 
        />
        
        <div class="buttons-container">
          <button @click="addLosses(player, 1)">Verloren (+1)</button>
          <button @click="removeLosses(player, -1)">Gewonnen (-1)</button>
        </div>
      </div>
    </div>

    <button @click="goBack" class="back-button">Zurück zur Übersicht</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Player } from '../Types/Player'; 
import { Session } from '../Types/Session';
import { defineProps } from 'vue';

// Router Setup
const route = useRoute();
const router = useRouter();

// Reaktive Variable für die Session
const session = ref<Session | null>(null);

// Deklaration der Props
const props = defineProps<{
  spielRundenId: string; // Die übergebene spielRundenId
}>();

// Funktion zum Abrufen der Session-Details
const fetchSessionDetails = async () => {
  const sessionId = props.spielRundenId; // Verwendung von props.spielRundenId
  console.log(sessionId, "<-------- spielRundenId");
  
  try {
    const response = await axios.get(`/api/getSpielrundeById?spielRundenId=${sessionId}`); // API-Call
    session.value = response.data; // Setze die Session-Daten
    console.log('Session Details:', session.value);
  } catch (error) {
    console.error('Fehler beim Abrufen der Session-Details:', error);
  }
};

// Funktion zum Zurückgehen zur Übersicht
const goBack = () => {
  router.push('/'); // Navigation zur Hauptseite
};

// Funktion zum Hinzufügen von Verlusten
const addLosses = async (player: Player, change: number) => {
  if (player.durakStand !== undefined) {
    player.durakStand += change; // Aktualisiere den lokalen durakStand
    const payload = { 
      playerId: player.spielerId,  // Hier den Spieler-ID verwenden
      durakStand: player.durakStand 
    }; // Payload erstellen
    try {
      const response = await axios.post('/api/updateDurakStand', payload); // POST-Request an das Backend
      console.log(`Erfolgreich aktualisiert: ${player.spielerId} mit DurakStand: ${player.durakStand}`);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des DurakStand:', error);
    }
  } else {
    console.error('durakStand ist nicht definiert');
  }
};

// Funktion zum Entfernen von Verlusten
const removeLosses = (player: Player, change: number) => {
  if (player.durakStand !== undefined) {
    player.durakStand -= change; // Aktualisiere den lokalen durakStand
  } else {
    console.error('durakStand ist nicht definiert');
  }
};

// Lade die Session-Details beim Mounten der Komponente
onMounted(() => {
  fetchSessionDetails(); // Rufe die Funktion auf, um die Session-Details zu laden
});
</script>

<style scoped>
.session-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.session-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.spieler-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spieler {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.profilbild {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.buttons-container {
  margin-top: 10px;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
