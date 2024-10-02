<template>
  <div class="session-detail">
    <h1 class="session-title">{{ session?.spielRundenNamen }}</h1>
    
    <div class="spieler-container">
      <div v-for="player in session?.spielerListe" :key="player.name" class="spieler">
        <h3>{{ player.name }}</h3>
        <img :src="player.profilBild" :alt="`Profilbild von ${player.name}`" class="profilbild" />
        
        <div class="buttons-container">
          <button @click="incrementLosses(player.name, -1)">Verloren -1</button>
          <button @click="incrementLosses(player.name, 1)">Gewonnen +1</button>
        </div>
      </div>
    </div>

    <button @click="goBack" class="back-button">Zurück zur Übersicht</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Dummy-Daten für die Session
const dummySession = {
  spielRundenNamen: "Test Session",
  spielrundenId: "12345",
  spielerListe: [
    { name: "Tom", profilBild: "https://via.placeholder.com/50" },
    { name: "Weyo", profilBild: "https://via.placeholder.com/50" },
    { name: "Jan", profilBild: "https://via.placeholder.com/50" },
    { name: "Mathis", profilBild: "https://via.placeholder.com/50" }
  ]
};

// Router Setup
const route = useRoute();
const router = useRouter();

// Reaktive Variable für die Session
const session = ref(dummySession); // Verwende die Dummy-Daten

// Funktion zum Zurückgehen zur Übersicht
const goBack = () => {
  router.push('/');
};

// Funktion zum Aktualisieren der Verluste (z.B. zum Testen)
const incrementLosses = (playerName: string, change: number) => {
  // Hier kannst du die Logik zum Aktualisieren der Verluste implementieren
  console.log(`Aktualisiere Verluste für ${playerName}: ${change}`);
};

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
