<template>
  <div class="home">
    <h1>Die Durak-Liste des Zorns</h1>
    <div class="buttons">
      <button>Spielrunde Laden</button>
      <button @click="goToCreateSession" >Spielrunde erstellen</button>
      <button @click="goToSeeAllPlayer" >Alle Spieler Einsehen</button>
      <button @click="goToCreatePlayer" >Spieler erstellen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

// Vue Router verwenden, um zur Spielererstellungsseite zu navigieren
const router = useRouter();

const goToCreatePlayer = (): void => {
  router.push('/createPlayer');
};

const goToSeeAllPlayer = (): void => {
  console.log("SeeallPlayer")
  router.push('/seeAllPlayer');
};

const goToCreateSession = (): void => {
  router.push('/createSession')
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

.buttons {
  display: flex;
  flex-direction: column; /* Button-Anordnung auf Spalte umstellen */
  align-items: center;    /* Zentriert die Buttons horizontal */
  margin-top: 30px;       /* Abstand über den Buttons */
}

button {
  padding: 15px 30px; /* Erhöht das Padding für größere Buttons */
  font-size: 20px;    /* Größere Schriftgröße für bessere Lesbarkeit */
  cursor: pointer;
  border: none;       /* Entfernt den Standardrahmen */
  border-radius: 5px; /* Abgerundete Ecken für die Buttons */
  background-color: #007bff; /* Hintergrundfarbe für die Buttons */
  color: white;       /* Schriftfarbe */
  margin-bottom: 20px; /* Abstand zwischen den Buttons */
  transition: background-color 0.3s; /* Sanfte Übergänge */
}

button:last-child {
  margin-bottom: 0; /* Entfernt den unteren Abstand beim letzten Button */
}

button:hover {
  background-color: #0056b3; /* Dunklere Farbe bei Hover */
}
</style>