import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const spieler = ref([]);
const sessionData = ref({
    spielRundenName: '',
    spielRundenId: '',
    spielerAnzeigenViewDTOS: [],
});
const searchQuery = ref('');
const addedPlayerIds = ref(new Set()); // Set für die hinzugefügten Spieler-IDs
// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId) => {
    addedPlayerIds.value.add(spielerId);
};
// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId) => {
    addedPlayerIds.value.delete(spielerId);
};
// Session speichern (Sessionnamen und Spieler-IDs ans Backend schicken)
const saveSession = async () => {
    if (sessionData.value.spielRundenName && addedPlayerIds.value.size > 0) {
        try {
            // Erstelle ein Objekt, das nur den Sessionnamen und die Spieler-IDs enthält
            const sessionPayload = {
                spielRundenName: sessionData.value.spielRundenName,
                spielerIds: Array.from(addedPlayerIds.value),
            };
            // Sende die Daten ans Backend
            const response = await axios.post('/api/createSpielRunde', sessionPayload);
            sessionData.value = response.data.data;
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
const fetchSpieler = async () => {
    try {
        const response = await axios.get('/api/getAlleSpieler');
        // Zugriff auf das Array mit den Spielern
        const spielerArray = response.data.data;
        if (Array.isArray(spielerArray)) {
            spielerArray.forEach((spielerData) => {
                // Spieler zur spieler-Referenz hinzufügen
                spieler.value.push({
                    spielerId: spielerData.spielerId.id,
                    name: spielerData.name,
                    profilePicture: spielerData.profilePicture, // Hier ist der vollständige Base64-String
                });
            });
        }
        else {
        }
    }
    catch (error) {
    }
};
// Aufruf der fetchPlayers Funktion beim Mounten
onMounted(() => {
    fetchSpieler(); // Spieler laden
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
    (__VLS_ctx.sessionData.spielRundenName);
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
                } }, ...{ class: (({ 'disabled': __VLS_ctx.addedPlayerIds.has(spieler.spielerId) })) }, disabled: ((__VLS_ctx.addedPlayerIds.has(spieler.spielerId))), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.removePlayerFromSession(spieler.spielerId);
                } }, ...{ class: (({ 'disabled': !__VLS_ctx.addedPlayerIds.has(spieler.spielerId) })) }, disabled: ((!__VLS_ctx.addedPlayerIds.has(spieler.spielerId))), });
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
