<template>
  <div v-if="spielrunde" class="session-detail">
    <h1 class="session-title">{{ spielrunde!.spielRundenName || 'Keine Session gefunden' }}</h1>

    <div class="bockrunde-container">
      <button class="bockrundeKnopf" @click="startBockrunde">Bockrunde</button>
      <img v-if="bockrundeImageVisible" :src=bockRunde alt="Bockrunde" class="bockrunde-image"/>
    </div>

    <div class="spieler-container">
      <div
          v-for="player in spielrunde!.spielerInRundeAnzeigenDTOS"
          :key="player.spielerId"
          class="spieler"
      >
        <h3>{{ player.name }}</h3>
        <img
            :alt="`Profilbild von ${player.name}`"
            :src="player.profilePicture"
            class="profilbild"
        />
        <h2>{{ player.durakStand }}</h2>
        <div class="buttons-container">
          <button class="duDurakKnopf" @click="calculateLooses(player)">Du Durak</button>
          <button :disabled="!isDuDurakPressed" class="korrekturKnopf" @click="removeLosses(player)">Korrektur</button>
        </div>
      </div>
    </div>

    <button class="back-button" @click="goBack">Zurück zur Übersicht</button>
  </div>
</template>


<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {Spielrunde} from '@/Types/Spielrunde';
import {PlayerInSession} from '@/Types/PlayerInSession';
import bockRunde from '../../assets/bockRunde.png'


const router = useRouter();

const spielrunde = ref<Spielrunde>();

const bockrundeStarted = ref(false);
const clickCount = ref(0); // Track clicks
const bockrundeImageVisible = ref(false);
const isDuDurakPressed = ref(false);

//   spielrunde.value = {
//    spielRundenName: "Testspielrunde",
//     spielRundenId: "jklshdfghsdkljfgh",
//    spielerInRundeAnzeigenDTOS: [
//      {
//        spielerId: "1",
//        name: "T",
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

const checkClickLimit = () => {
  if (clickCount.value >= 3) {
    router.push('/SeeAllSessions');
  }
}

const goBack = () => {
  router.push('/');
};

const calculateLooses = async (player: PlayerInSession) => {
  const sessionId = props.spielRundenId;
  let durakArt: String;

  if (!bockrundeStarted.value) {
    durakArt = "normal";
    console.log("keine Bockrunde", durakArt);
  } else {
    durakArt = "bockrunde";
    clickCount.value++
  }

  const payload = {
    spielRundenId: sessionId,
    spielerId: player.spielerId,
    durakArt: durakArt
  };

  console.log(payload);

  try {
    const response = await axios.post('/api/changedurakstand', payload);
    player.durakStand = response.data.data.durakStand;
    console.log(player.durakStand, "Aktualisierter player.durakStand");
    console.log('Spieler-ID:', response.data.spielerId);
  } catch (error) {
    console.log('Fehler', error);
  }
  isDuDurakPressed.value = true
  checkClickLimit();
};

const removeLosses = async (player: PlayerInSession) => {
  const sessionId = props.spielRundenId;
  let durakArt: String
  if (!bockrundeStarted.value) {
    durakArt = "normal";
  } else {
    durakArt = "bockrunde"
    clickCount.value--
  }

  const payload = {
    spielRundenId: sessionId,
    spielerId: player.spielerId,
    durakArt: durakArt
  }

  console.log(payload)
  try {
    const response = await axios.post('/api/changedurakstand', payload);
    player.durakStand = response.data.data.durakStand
  } catch (error) {
    console.log('Fehler', error)
  }
  checkClickLimit()
};

onMounted(() => {
  fetchSessionDetails();
});

const startBockrunde = () => {
  bockrundeStarted.value = true;
  bockrundeImageVisible.value = true;
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

.bockrunde-container {
  display: flex;
  align-items: center; /* Center the button and image vertically */
  margin-top: 20px; /* Space above the container */
}

.bockrundeKnopf {
  padding: 15px 30px; /* Button padding */
  font-size: 1.2rem; /* Font size */
  font-weight: bold; /* Bold text */
  background-color: #007bff; /* Primary color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s; /* Transition effect */
}

.bockrundeKnopf:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.bockrunde-image {
  width: 50px; /* Adjust the size as needed */
  height: auto; /* Maintain aspect ratio */
  margin-left: 10px; /* Space between button and image */
}

</style>