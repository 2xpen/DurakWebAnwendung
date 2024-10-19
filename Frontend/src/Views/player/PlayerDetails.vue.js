import { onBeforeMount, ref } from "vue";
import axios from "axios";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const currentPlayer = ref(null);
const shopItems = ref(null);
const inventoryItems = ref(null);
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
    }
    catch (error) {
        console.error("Fehler beim Abrufen des Spielers:", error);
    }
};
// Funktion zum Abrufen der Shop-Items
const fetchShopItems = async () => {
    try {
        const response = await axios.get("/api/shop-items");
        shopItems.value = response.data;
    }
    catch (error) {
        console.error("Fehler beim Abrufen der Shop-Einträge:", error);
    }
};
// Funktion zum Abrufen des Spielerinventars
const fetchPlayerItems = async () => {
    try {
        const response = await axios.get(`/api/inventory?spielerId=${props.spielerId}`);
        inventoryItems.value = response.data.data;
        console.log(response.data.data, " das war die Antwort auf fetchPlayerItems");
    }
    catch (error) {
        console.error("Fehler beim Abrufen des Inventars:", error);
    }
};
// Funktion zum Kauf eines Items
const itemKaufen = async (itemName) => {
    const playerId = props.spielerId;
    try {
        const response = await axios.post("/api/purchase", {
            itemName,
            playerId,
        });
        console.log("Kauf erfolgreich:", response.data);
        await fetchPlayerItems(); // Aktualisiere das Inventar nach dem Kauf
    }
    catch (error) {
        console.error("Fehler beim Kauf:", error);
    }
};
// Beim Mounten die Daten laden
onBeforeMount(() => {
    fetchShopItems();
    fetchPlayerItems();
    fetchCurrentPlayer();
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("player-details") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_styleScopedClasses['player-details'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
