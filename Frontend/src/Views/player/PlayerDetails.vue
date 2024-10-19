<template>
  <div class="player-details">
    <h1></h1>


  </div>


</template>


<script lang="ts" setup>

import {onBeforeMount, ref} from "vue";
import {Player} from "@/Types/Player";
import {ShopItem} from "@/Types/ShopItem";
import axios from "axios";
import {PlayerItem} from "@/Types/PlayerItem";

const props = defineProps<{
  spielerId: string;
}>();

const currentPlayer = ref<Player | null>(null);
const shopItems = ref<ShopItem | null>(null);
const inventoryItems = ref<PlayerItem | null>(null);

// Funktion zum Abrufen des aktuellen Spielers
const fetchCurrentPlayer = async () => {
  try {
    console.log("anfrage wird gesendet ... ");
    console.log(props.spielerId, " das war die angefragte Spieler-ID ");
    const response = await axios.get(`/api/getSpielerById?spielerId=${props.spielerId}`);
    console.log("anfrage empfangen ... ");
    console.log(response.data.data, " ... die empfangenen datei");

    const playerData = response.data.data;
    currentPlayer.value = {
      spielerId: playerData.spielerId,
      name: playerData.name,
      profilePicture: playerData.profilePicture,
    };
  } catch (error) {
    console.error("Fehler beim Abrufen des Spielers:", error);
  }
};

// Funktion zum Abrufen der Shop-Items
const fetchShopItems = async () => {
  try {
    const response = await axios.get("/api/shop-items");
    shopItems.value = response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Shop-Einträge:", error);
  }
};

// Funktion zum Abrufen des Spielerinventars
const fetchPlayerItems = async () => {
  try {
    const response = await axios.get(`/api/inventory?spielerId=${props.spielerId}`);
    inventoryItems.value = response.data.data;
    console.log(response.data.data, " das war die Antwort auf fetchPlayerItems");
  } catch (error) {
    console.error("Fehler beim Abrufen des Inventars:", error);
  }
};

// Funktion zum Kauf eines Items
const itemKaufen = async (itemName: string) => {
  const playerId = props.spielerId;
  try {
    const response = await axios.post("/api/purchase", {
      itemName,
      playerId,
    });
    console.log("Kauf erfolgreich:", response.data);
    await fetchPlayerItems(); // Aktualisiere das Inventar nach dem Kauf
  } catch (error) {
    console.error("Fehler beim Kauf:", error);
  }
};

// Beim Mounten die Daten laden
onBeforeMount(() => {
  fetchShopItems();
  fetchPlayerItems();
  fetchCurrentPlayer();
});

</script>


<style scoped>
.player-details {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>