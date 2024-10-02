import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const spieler = ref([]); // Hier werden die Spieler gespeichert
// Session State
const sessionData = ref({
    spielRundenNamen: '',
    spielrundenId: '', // Dieses Feld wird nicht ins Backend gesendet
    spielerListe: [],
});
const searchQuery = ref(''); // Suchabfrage für die Spieler
const addedPlayerIds = ref(new Set()); // Set für die hinzugefügten Spieler-IDs
// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId) => {
    addedPlayerIds.value.add(spielerId);
    console.log('Spieler hinzugefügt:', Array.from(addedPlayerIds.value));
};
// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId) => {
    addedPlayerIds.value.delete(spielerId);
    console.log('Spieler entfernt:', Array.from(addedPlayerIds.value));
};
// Session speichern (Sessionnamen und Spieler-IDs ans Backend schicken)
const saveSession = async () => {
    if (sessionData.value.spielRundenNamen && addedPlayerIds.value.size > 0) {
        try {
            // Erstelle ein Objekt, das nur den Sessionnamen und die Spieler-IDs enthält
            const sessionPayload = {
                spielRundenNamen: sessionData.value.spielRundenNamen,
                spielerIds: Array.from(addedPlayerIds.value),
            };
            console.log(sessionPayload);
            // Sende die Daten ans Backend
            const response = await axios.post('/api/createSpielRunde', sessionPayload);
            console.log('Session erstellt:', response.data);
            // Zurück zur Startseite nach dem Speichern der Session
            router.push('/');
        }
        catch (error) {
            console.error('Fehler beim Erstellen der Session:', error);
        }
    }
    else {
        alert('Bitte gib einen Sessionnamen ein und wähle mindestens einen Spieler aus.');
    }
};
// Zurück zur Startseite
const goHome = () => {
    router.push('/');
};
const fetchPlayers = async () => {
    try {
        const response = await axios.get('/api/getAlleSpieler'); // Endpunkt zum Abrufen der Spieler
        spieler.value = response.data; // Setze die Spieler-Daten in die Reaktiv-Variable
        console.log('Spieler erfolgreich geladen:', spieler.value);
    }
    catch (error) {
        console.error('Fehler beim Laden der Spieler:', error);
    }
};
// Aufruf der fetchPlayers Funktion beim Mounten
onMounted(() => {
    fetchPlayers(); // Spieler laden
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
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['save-session'];
    __VLS_styleScopedClasses['buttons'];
    __VLS_styleScopedClasses['actions'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-erstellen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-name") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Sessionname eingeben"), });
    (__VLS_ctx.sessionData.spielRundenNamen);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-suche") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Spieler suchen..."), });
    (__VLS_ctx.searchQuery);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-list") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-grid") }, });
    for (const [spieler] of __VLS_getVForSourceType((__VLS_ctx.spieler))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((spieler.spielerId)), ...{ class: ("spieler") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (spieler.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((spieler.profilePicture)), alt: ("Profilbild"), ...{ class: ("profilbild") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("actions") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.addPlayerToSession(spieler.spielerId);
                } }, disabled: ((__VLS_ctx.addedPlayerIds.has(spieler.spielerId))), ...{ class: (({ 'disabled': __VLS_ctx.addedPlayerIds.has(spieler.spielerId) })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.removePlayerFromSession(spieler.spielerId);
                } }, disabled: ((!__VLS_ctx.addedPlayerIds.has(spieler.spielerId))), ...{ class: (({ 'disabled': !__VLS_ctx.addedPlayerIds.has(spieler.spielerId) })) }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("save-session") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.saveSession) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['session-erstellen'];
    __VLS_styleScopedClasses['session-name'];
    __VLS_styleScopedClasses['spieler-suche'];
    __VLS_styleScopedClasses['spieler-list'];
    __VLS_styleScopedClasses['spieler-grid'];
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['disabled'];
    __VLS_styleScopedClasses['disabled'];
    __VLS_styleScopedClasses['save-session'];
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
            spieler: spieler,
            sessionData: sessionData,
            searchQuery: searchQuery,
            addedPlayerIds: addedPlayerIds,
            addPlayerToSession: addPlayerToSession,
            removePlayerFromSession: removePlayerFromSession,
            saveSession: saveSession,
            goHome: goHome,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
