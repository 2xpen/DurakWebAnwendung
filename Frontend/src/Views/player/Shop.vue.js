import { defineComponent, ref, onBeforeMount } from "vue";
import axios from "axios";
export default defineComponent({
    name: "Shop",
    props: {
        spielerId: {
            type: String, // Spieler-ID sollte als String übergeben werden
            required: true,
        },
    },
    setup(props) {
        const shopItems = ref([]); // Reaktive Shop-Items
        const inventoryItems = ref([]); // Reaktive Inventar-Items
        const currentPlayer = ref(null); // Reaktiver Spieler, startet als null
        // Funktion zum Abrufen des aktuellen Spielers
        const fetchCurrentPlayer = async () => {
            try {
                console.log("anfrage wird gesendet ... ");
                console.log(props.spielerId, " das war die angefragte Spieler-ID ");
                const response = await axios.get(`/api/getSpielerById?spielerId=${props.spielerId}`);
                console.log("anfrage empfangen ... ");
                console.log(response.data.data, " ... die empfangenen datei");
                // console.log(response.data, " ... die empfangenen datei");
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
        // Rückgabe der Daten und Funktionen, damit sie in der Vorlage verwendet werden können
        return {
            currentPlayer,
            shopItems,
            inventoryItems,
            itemKaufen,
        };
    },
});
;
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
    __VLS_styleScopedClasses['shop-items'];
    __VLS_styleScopedClasses['shop-items'];
    __VLS_styleScopedClasses['inventory'];
    __VLS_styleScopedClasses['inventory'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("shop") }, });
    if (__VLS_ctx.currentPlayer) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (__VLS_ctx.currentPlayer.name);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    if (__VLS_ctx.shopItems.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.shopItems))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((item.name)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ((item.name)), src: ((item.bild)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (item.name);
            (item.preis);
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.shopItems.length)))
                            return;
                        __VLS_ctx.itemKaufen(item.name);
                    } }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    if (__VLS_ctx.inventoryItems.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.inventoryItems))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((item.name)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ((item.name)), src: ((item.bild)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (item.name);
            (item.anzahl);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_styleScopedClasses['shop'];
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
let __VLS_self;
