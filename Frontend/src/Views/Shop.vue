<template>
  <div class="shop">
    <!-- Überschrift für aktuellen Spieler -->
    <h2 v-if="currentPlayer">Shop für Spieler: {{ currentPlayer.name }}</h2>
    <h2 v-else>Spieler wird geladen...</h2>

    <!-- Shop-Items anzeigen -->
    <h3>Shop-Items</h3>
    <div v-if="shopItems.length">
      <ul>
        <li v-for="item in shopItems" :key="item.name">
          <img :alt="item.name" :src="item.bild"/>
          <p>{{ item.name }} - {{ item.preis }} €</p>
          <button @click="itemKaufen(item.name)">Kaufen</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Keine Shop-Einträge gefunden.</p>
    </div>

    <!-- Inventar anzeigen -->
    <h3>Inventar</h3>
    <div v-if="inventoryItems.length">
      <ul>
        <li v-for="item in inventoryItems" :key="item.name">
          <img :alt="item.name" :src="item.bild"/>
          <p>{{ item.name }} - Anzahl: {{ item.anzahl }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Das Inventar ist leer.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, onBeforeMount} from "vue";
import axios from "axios";
import {Player} from "@/Types/Player";
import {ShopItem} from "@/Types/ShopItem";
import {PlayerItem} from "@/Types/PlayerItem";

export default defineComponent({
  name: "Shop",
  props: {
    spielerId: {
      type: String, // Spieler-ID sollte als String übergeben werden
      required: true,
    },
  },
  setup(props) {
    const shopItems = ref<ShopItem[]>([]); // Reaktive Shop-Items
    const inventoryItems = ref<PlayerItem[]>([]); // Reaktive Inventar-Items
    const currentPlayer = ref<Player | null>(null); // Reaktiver Spieler, startet als null

    // Funktion zum Abrufen des aktuellen Spielers
    const fetchCurrentPlayer = async () => {
      try {
        console.log("anfrage wird gesendet ... ");
        console.log(props.spielerId, " das war die angefragte Spieler-ID ");
        const response = await axios.get(`/api/getSpielerById?spielerId=${props.spielerId}`);
        console.log("anfrage empfangen ... ");
        console.log(response.data.data, " ... die empfangenen datei");
        console.log(response.data, " ... die empfangenen datei");

        const playerData = response.data.data;
        currentPlayer.value = {
          spielerId: playerData.spielerId,
          name: playerData.name,
          profilePicture: playerData.profilePicture,
        };
      } catch (error) {
        console.error("Fehler beim Abrufen des Spielers:", error);
        console.log("häää");
        alert("heidewitzka ");
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

    // Rückgabe der Daten und Funktionen, damit sie in der Vorlage verwendet werden können
    return {
      currentPlayer,
      shopItems,
      inventoryItems,
      itemKaufen,
    };
  },
});
</script>

<style scoped>
.shop {
  padding: 20px;
  background-color: #f5f5f5; /* Hellgrauer Hintergrund für den Shop */
  border-radius: 10px;
}

.shop-container {
  display: flex;
  justify-content: space-between; /* Verteilt die Items gleichmäßig */
}

.shop-items {
  width: 60%; /* Breite des Shop-Items Bereichs */
  background-color: #e0e0e0; /* Hellgraue Hintergrundfarbe */
  padding: 10px;
  border-radius: 5px;
}

.shop-items ul {
  list-style-type: none; /* Entfernt die Standardliste */
  padding: 0;
}

.shop-items li {
  display: flex;
  align-items: center;
  margin: 10px 0; /* Abstand zwischen den Items */
}

.inventory {
  width: 35%; /* Breite des Inventar Bereichs */
  background-color: #d0ffd0; /* Hellgrüne Hintergrundfarbe */
  padding: 10px;
  border-radius: 5px;
}

.inventory ul {
  list-style-type: none; /* Entfernt die Standardliste */
  padding: 0;
}

.inventory li {
  display: flex;
  align-items: center;
  margin: 10px 0; /* Abstand zwischen den Items */
}
</style>
