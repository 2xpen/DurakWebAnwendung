<template>
  <div class="spieler-liste">
    <h1 class="titel">Spielerliste</h1>
    <div class="spieler-grid" v-if="spieler.length > 0">
      <div v-for="spieler in spieler" :key="spieler.spielerId" class="spieler-item">
        <h3>{{ spieler.name }}</h3>
        <img :src="spieler.profilePicture" :alt="`Profilbild von ${spieler.name}`" class="profilbild" />
      </div>
    </div>
    <p v-else>Keine Spieler gefunden.</p>
    <button @click="goHome" class="buttons">Abbrechen</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
import { Player } from '../Types/Player';

const spieler = ref<Player[]>([]);

const fetchSpieler = async () => {
  try {
    const response = await axios.get('/api/getAlleSpieler');
    console.log('API Response:', response); // API Antwort überprüfen

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
      console.error('Erwartetes Array, aber erhalten:', spielerArray);
    }
    
    console.log('Spieler-Daten:', spieler.value);
  } catch (error) {
    console.error('Fehler beim Abrufen der Spieler:', error);
  }
};

onMounted(() => {
  fetchSpieler();
});

const goHome = () => {
  router.push('/'); // Navigiere zur Startseite
};
</script>

<style scoped>
.spieler-liste {
  text-align: center;
  margin-top: 50px;
}

.titel {
  font-size: 2rem;
  margin-bottom: 20px;
}

.spieler-grid {
  display: grid;
  grid-template-columns: repeat(5, 54px); /* 5 Spalten, jede 54px breit */
  gap: 10px; /* Abstand zwischen den Bildern */
  justify-content: center; /* Zentriert das Grid innerhalb des Containers */
}

.spieler-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profilbild {
  width: 54px;
  height: 54px;
  border-radius: 50%; /* Runde Ecken für ein Profilbild */
}

.buttons {
  margin-top: 20px;
}
</style>
