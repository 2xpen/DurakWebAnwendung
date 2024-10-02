import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// import profile1 from '../assets/Profilbilder/ProfilBild1.png';
// import profile3 from '../assets/Profilbilder/ProfilBild3.png';
// import profile2 from '../assets/Profilbilder/ProfilBild2.png';
// Router Setup
const route = useRoute();
const router = useRouter();
// Reaktive Variable für die Session
const session = ref(null);
// session.value = 
//   {
//   "spielRundenName": "Testspiel Runde 1",
//   "spielrundenId": "12345",
//   "spielerAnzeigenViewDTOS": [
//     {
//       "spielerId": "1",
//       "name": "Max Mustermann",
//       "profilePicture": profile1,
//       "durakStand": 0
//     },
//     {
//       "spielerId": "2",
//       "name": "Lisa Müller",
//       "profilePicture": profile2,
//       "durakStand": 1
//     },
//     {
//       "spielerId": "3",
//       "name": "Hans Schmidt",
//       "profilePicture": profile3,
//       "durakStand": -1
//     }
//   ]
// }
// Funktion zum Abrufen der Session-Details
const fetchSessionDetails = async () => {
    const sessionId = route.params.sessionId; // Holen der sessionId aus den Routenparametern
    try {
        const response = await axios.get(`/api/getSpielrundeById/${sessionId}`); // API-Call
        session.value = response.data; // Setze die Session-Daten
        console.log('Session Details:', session.value);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Session-Details:', error);
    }
};
// Funktion zum Zurückgehen zur Übersicht
const goBack = () => {
    router.push('/'); // Navigation zur Hauptseite
};
// Funktion zum Hinzufügen von Verlusten
const addLosses = async (player, change) => {
    if (player.durakStand !== undefined) {
        player.durakStand += change; // Aktualisiere den lokalen durakStand
        const payload = {
            playerId: player.spielerId, // Hier den Spieler-ID verwenden
            durakStand: player.durakStand
        }; // Payload erstellen
        try {
            const response = await axios.post('/api/updateDurakStand', payload); // POST-Request an das Backend
            console.log(`Erfolgreich aktualisiert: ${player.spielerId} mit DurakStand: ${player.durakStand}`);
        }
        catch (error) {
            console.error('Fehler beim Aktualisieren des DurakStand:', error);
        }
    }
    else {
        console.error('durakStand ist nicht definiert');
    }
};
// Funktion zum Entfernen von Verlusten
const removeLosses = (player, change) => {
    if (player.durakStand !== undefined) {
        player.durakStand -= change; // Aktualisiere den lokalen durakStand
    }
    else {
        console.error('durakStand ist nicht definiert');
    }
};
// Lade die Session-Details beim Mounten der Komponente
onMounted(() => {
    fetchSessionDetails(); // Rufe die Funktion auf, um die Session-Details zu laden
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
    __VLS_styleScopedClasses['back-button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-detail") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("session-title") }, });
    (__VLS_ctx.session?.spielRundenName);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
    for (const [player] of __VLS_getVForSourceType((__VLS_ctx.session?.spielerAnzeigenViewDTOS))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((player.spielerId)), ...{ class: ("spieler") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (player.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (player.durakStand);
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilePicture)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.addLosses(player, 1);
                } }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.removeLosses(player, -1);
                } }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goBack) }, ...{ class: ("back-button") }, });
    __VLS_styleScopedClasses['session-detail'];
    __VLS_styleScopedClasses['session-title'];
    __VLS_styleScopedClasses['spieler-container'];
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['buttons-container'];
    __VLS_styleScopedClasses['back-button'];
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
        return {
            session: session,
            goBack: goBack,
            addLosses: addLosses,
            removeLosses: removeLosses,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
