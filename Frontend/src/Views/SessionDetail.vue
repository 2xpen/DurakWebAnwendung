<template>
  <div  v-if="spielrunde" class="session-detail">
    <h1 class="session-title">{{ spielrunde!.spielRundenName || 'Keine Session gefunden' }}</h1>
    
    <div class="spieler-container">
      <div 
        v-for="player in spielrunde!.spielerInRundeAnzeigenDTOS" 
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
          <button @click="addLosses(player, 1)" class="duDurakKnopf">Du Durak</button>
          <button @click="removeLosses(player, -1)" class="korrekturKnopf">Korrektur</button>
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
import { Spielrunde } from '../Types/Spielrunde';
import { defineProps } from 'vue';
// import Weyo from '../assets/Profilbilder/Weyo.png'

const route = useRoute();
const router = useRouter();

const spielrunde = ref<Spielrunde>();
//   spielrunde.value = {
//    spielRundenName: "Testspielrunde",
//     spielRundenId: "jklshdfghsdkljfgh",
//    spielerInRundeAnzeigenDTOS: [
//      {
//        spielerId: "1",
//        name: "Weyo",
//        durakStand: 2,
//        profilePicture: Weyo
//       },
//     {
//        spielerId: "2",
//       name: "Jan",
//        durakStand: 0,
//       profilePicture: Weyo
//     },
//      {
//       spielerId: "3",
//       name: "Mathis",
//       durakStand: 1,
//         profilePicture: Weyo
//      },
//      {
//       spielerId: "4",
//       name: "Tom",
//       durakStand: 1,
//         profilePicture: Weyo
//      }
//    ]
// };


const props = defineProps<{
  spielRundenId: string; 
}>();

const fetchSessionDetails = async () => {
  const sessionId = props.spielRundenId; 
  try {
    const response = await axios.get(`/api/getSpielrundeById?spielRundenId=${sessionId}`); 
    spielrunde.value = response.data.data; 
    console.log(spielrunde.value, "session.value")
    console.log(spielrunde.value!.spielRundenName, "spielRundenName")
  } catch (error) {
    console.error('Fehler beim Abrufen der Session-Details:', error);
  }
};

const goBack = () => {
  router.push('/'); 
};

const addLosses = async (player: Player, change: number) => {
  // if (player.durakStand !== undefined) {
  //   player.durakStand += change; 
  //   const payload = { 
  //     playerId: player.spielerId,  
  //     durakStand: player.durakStand 
  //   };
  //   try {
  //     const response = await axios.post('/api/updateDurakStand', payload);
  //     console.log(`Erfolgreich aktualisiert: ${player.spielerId} mit DurakStand: ${player.durakStand}`);
  //   } catch (error) {
  //     console.error('Fehler beim Aktualisieren des DurakStand:', error);
  //   }
  // } else {
  //   console.error('durakStand ist nicht definiert');
  // }
};

const removeLosses = (player: Player, change: number) => {
  // if (player.durakStand !== undefined) {
  //   player.durakStand -= change; 
  // } else {
  //   console.error('durakStand ist nicht definiert');
  // }
};

onMounted(() => {
  fetchSessionDetails(); 
});
</script>
<style>
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
  flex-wrap: wrap; /* Allow the items to wrap to the next line */
  justify-content: center; /* Center the player divs horizontally */
  align-items: center; /* Center the player divs vertically */
  max-width: 800px; /* Optional: Set a maximum width for the container */
  margin: 0 auto; /* Center the container within the parent */
}

.spieler {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: calc(50% - 20px); /* Set width to 50% minus margin for two side by side */
  box-sizing: border-box; /* Include padding and border in the element's total width */
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

.duDurakKnopf {
  padding: 15px 30px; /* Increased padding for a larger button */
  font-size: 1.2rem; /* Larger font size */
  font-weight: bold; /* Make the text bold */
  background-color: #007bff; /* Green background */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Transition effect */
}

.duDurakKnopf:hover {
  background-color: #0056b3; /* Darker green on hover */
}

.korrekturKnopf {
  padding: 8px 16px; /* Smaller padding for a more subtle button */
  font-size: 1rem; /* Normal font size */
  background-color: #550019; /* Yellow background */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Transition effect */
  margin-left: 10px;
}

.korrekturKnopf:hover {
  background-color: #2b000d; /* Darker yellow on hover */
}

</style>