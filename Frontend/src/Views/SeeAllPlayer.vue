<template>
  <div class="spieler-liste">
    <h1 class="titel">Spielerliste</h1>
    <div class="spieler-grid" v-if="spieler.length > 0">
      <div v-for="spieler in spieler" :key="spieler.spielerId" class="spieler">
        <h3>{{ spieler.name }}</h3>
        <div class="bild-container">
          <img :src="spieler.profilePicture" :alt="`Profilbild von ${spieler.name}`" class="profilbild" />
        </div>
        <div class="actions">
          <button @click="bearbeiten(spieler)" class="actions button">Bearbeiten</button>
          <button @click="loeschen(spieler)" class="actions button">Löschen</button>
        </div>
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

// const spieler = ref<Player[]>([
//   { name: 'Tom', profilePicture: profile1 },
//   { name: 'Weyo', profilePicture: profile2 },
//   { name: 'Jan', profilePicture: profile3 },
//   { name: 'Mathis', profilePicture: profile4 },
//   { name: 'Mobamboficker', profilePicture: profile5 },
//   { name: 'Peter Jökel', profilePicture: profile6 },
//   { name: 'Spieler 7', profilePicture: profile7 },
//   { name: 'Spieler 8', profilePicture: profile8 },
//   { name: 'Spieler 9', profilePicture: profile9 },
//   { name: 'Spieler 10', profilePicture: profile10 },
// ]);

const fetchSpieler = async () => {
  try {
    const response = await axios.get('/api/getAlleSpieler');
   

    // Zugriff auf das Array mit den Spielern
    const spielerArray = response.data.data;
    console.log(spielerArray, "<------- empfangene Spieler")

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

const bearbeiten = (spieler: Player) => {
  // Logik für Bearbeiten hinzufügen

};

const loeschen = (spieler: Player) => {
  // Logik für Löschen hinzufügen

};

onMounted(() => {
  fetchSpieler();
});

const goHome = () => {
  router.push('/'); // Navigiere zur Startseite
};
</script>

<style scoped>
.titel {
  font-size: 2rem;
  margin-bottom: 20px;
}

.spieler-liste {
  text-align: center;
  margin-top: 50px;
  max-width: 1200px; /* Maximale Breite für den Container */
  margin-left: auto; /* Zentriert den Container */
  margin-right: auto; /* Zentriert den Container */
  padding: 0 20px; /* Innenabstand links und rechts */
}


.spieler {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px; /* Breite des Containers */
  padding: 10px; /* Innenabstand */
  text-align: center; /* Text zentrieren */
}

.spieler-grid {
  display: grid; /* Ändert das Layout zu einem Grid */
  grid-template-columns: repeat(5, 1fr); /* 5 gleichmäßige Spalten */
  gap: 20px; /* Abstand zwischen den Spielern */
  justify-items: center; /* Zentriert die Spieler in den Zellen */
}
.bild-container {
  padding: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profilbild {
  width: 54px;
  height: 54px;
  border-radius: 50%;
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
