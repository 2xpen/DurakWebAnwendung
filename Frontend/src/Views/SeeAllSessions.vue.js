import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// import profile1 from '../assets/Profilbilder/ProfilBild1.png';
// import profile3 from '../assets/Profilbilder/ProfilBild3.png';
// import profile2 from '../assets/Profilbilder/ProfilBild2.png';
const sessions = ref([]);
// sessions.value = [
//    {
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
// ]
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
// Reaktive Variablen für Sessions
// const sessions = ref<Session[]>([
//   {
//     spielRundenNamen: "Testsession 1", // Name der ersten Session
//     spielrundenId: "1001", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "Tom", profilePicture: profile1 }, // Platzhalter für das Profilbild
//       { name: "Anna", profilePicture: profile2 },
//       { name: "Max", profilePicture: profile3 },
//       { name: "Sophia", profilePicture: profile4 }
//     ]
//   },
//   {
//     spielRundenNamen: "Testsession 2", // Name der zweiten Session
//     spielrundenId: "1002", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "Peter", profilePicture: profile5 },
//       { name: "Clara", profilePicture: profile6 }
//     ]
//   },
//   {
//     spielRundenNamen: "Testsession 3", // Name der dritten Session
//     spielrundenId: "1003", // Eindeutige ID der Session
//     spielerListe: [
//       { name: "John", profilePicture: profile7 },
//       { name: "Emily", profilePicture: profile8 },
//       { name: "Michael", profilePicture: profile9 },
//       { name: "Sarah", profilePicture: profile10 },
//       { name: "David", profilePicture: profile1 } // Mehr als 4 Spieler, um die "+ mehr" Anzeige zu testen
//     ]
//   }
// ]);
// Navigiere zur Startseite
const goHome = () => {
    router.push('/');
};
// Funktion, um nur die ersten 4 Spieler zurückzugeben
const getLimitedPlayers = (spielerListe) => {
    return spielerListe.slice(0, 4); // Nur die ersten 4 Spieler zurückgeben
};
// Funktion zum Abrufen der Sessions
const fetchSessions = async () => {
    try {
        const response = await axios.get('/api/getAlleSpielrundenAuswahlView'); // API-Endpunkt
        sessions.value = response.data.data; // Daten der Sessions zuweisen
        console.log(sessions.value, "<------- empfangene session");
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Sessions:', error);
    }
};
// Funktion zum Starten der Session
const startSession = (spielrundenId) => {
    console.log(sessions, "dies ist die Session");
    console.log(spielrundenId, "sessionId in startSession"); // Dies gibt `undefined` aus?
    if (spielrundenId) {
        router.push({ name: 'sessionDetail', params: { spielrundenId } });
    }
    else {
        console.error("Keine gültige sessionId vorhanden");
    }
};
// Lade die Sessions beim Mounten der Komponente
onMounted(() => {
    fetchSessions(); // Rufe die Funktion auf, um die Sessions zu laden
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
    __VLS_styleScopedClasses['start-button'];
    __VLS_styleScopedClasses['buttons'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sessions-view") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("titel") }, });
    if (__VLS_ctx.sessions.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("sessions-list") }, });
        for (const [session] of __VLS_getVForSourceType((__VLS_ctx.sessions))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((session.spielrundenId)), ...{ class: ("session-row") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-name") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (session.spielRundenName);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
            for (const [player, index] of __VLS_getVForSourceType((__VLS_ctx.getLimitedPlayers(session.spielerAnzeigenViewDTOS)))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: ("spieler") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
                (player.name);
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilePicture)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
            }
            if (session.spielerAnzeigenViewDTOS.length > 4) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mehr-spieler") }, });
                (session.spielerAnzeigenViewDTOS.length - 4);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("start-button-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.sessions.length > 0)))
                            return;
                        __VLS_ctx.startSession(session.spielrundenId);
                    } }, ...{ class: ("start-button") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['sessions-view'];
    __VLS_styleScopedClasses['titel'];
    __VLS_styleScopedClasses['sessions-list'];
    __VLS_styleScopedClasses['session-row'];
    __VLS_styleScopedClasses['session-name'];
    __VLS_styleScopedClasses['spieler-container'];
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['mehr-spieler'];
    __VLS_styleScopedClasses['start-button-container'];
    __VLS_styleScopedClasses['start-button'];
    __VLS_styleScopedClasses['buttons'];
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
            sessions: sessions,
            goHome: goHome,
            getLimitedPlayers: getLimitedPlayers,
            startSession: startSession,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
