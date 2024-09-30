import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const spieler = ref([]);
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
// Session State
const sessionData = ref({
    spielRundenName: '', // Sessionname leer initialisieren
    spielerIds: [], // Leere Liste von Spieler-IDs
});
// Alle Spieler abrufen
// const spieler = ref<Player[]>([
//   { spielerId: '1', name: 'Tom', profilePicture: profile1 },
//   { spielerId: '2', name: 'Weyo', profilePicture: profile2 },
//   { spielerId: '3', name: 'Jan', profilePicture: profile3 },
//   { spielerId: '4', name: 'Mathis', profilePicture: profile4 },
//   { spielerId: '5', name: 'Mobamboficker', profilePicture: profile5 },
//   { spielerId: '6', name: 'Peter Jökel', profilePicture: profile6 },
//   { spielerId: '7', name: 'Spieler 7', profilePicture: profile7 },
//   { spielerId: '8', name: 'Spieler 8', profilePicture: profile8 },
//   { spielerId: '9', name: 'Spieler 9', profilePicture: profile9 },
//   { spielerId: '10', name: 'Spieler 10', profilePicture: profile10 },
// ]);
const fetchSpieler = async () => {
    try {
        const response = await axios.get('/api/getAlleSpieler');
        const spielerArray = response.data.data;
        if (Array.isArray(spielerArray)) {
            spielerArray.forEach((spielerData) => {
                spieler.value.push({
                    spielerId: spielerData.spielerId.id,
                    name: spielerData.name,
                    profilePicture: spielerData.profilePicture, // Base64-Bild
                });
            });
        }
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Spieler:', error);
    }
};
const addedPlayers = ref(new Set());
// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId) => {
    if (!sessionData.value.spielerIds.includes(spielerId)) {
        sessionData.value.spielerIds.push(spielerId);
        addedPlayers.value.add(spielerId); // Spieler-ID zum Set hinzufügen
    }
    console.log('Spieler hinzugefügt:', sessionData.value.spielerIds);
};
// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId) => {
    const index = sessionData.value.spielerIds.indexOf(spielerId);
    if (index > -1) {
        sessionData.value.spielerIds.splice(index, 1);
        addedPlayers.value.delete(spielerId); // Spieler-ID aus dem Set entfernen
    }
    console.log('Spieler entfernt:', sessionData.value.spielerIds);
};
// Session speichern
const saveSession = async () => {
    if (sessionData.value.spielRundenName && sessionData.value.spielerIds.length > 0) {
        try {
            const response = await axios.post('/api/createSpielRunde', sessionData.value);
            console.log('Session erstellt:', response.data);
            // Session-ID aus dem Backend
            sessionData.value.spielRundenId = response.data.sessionId;
            // Zurück zur Startseite nach Speichern der Session
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
// Initialisierung - Spieler abrufen
onMounted(() => {
    fetchSpieler();
});
// Zurück zur Startseite
const goHome = () => {
    router.push('/');
};
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
    if (__VLS_ctx.spieler.length > 0) {
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
                        if (!((__VLS_ctx.spieler.length > 0)))
                            return;
                        __VLS_ctx.addPlayerToSession(spieler.spielerId);
                    } }, disabled: ((__VLS_ctx.addedPlayers.has(spieler.spielerId))), ...{ class: (({ 'disabled': __VLS_ctx.addedPlayers.has(spieler.spielerId) })) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spieler.length > 0)))
                            return;
                        __VLS_ctx.removePlayerFromSession(spieler.spielerId);
                    } }, disabled: ((!__VLS_ctx.addedPlayers.has(spieler.spielerId))), ...{ class: (({ 'disabled': !__VLS_ctx.addedPlayers.has(spieler.spielerId) })) }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("save-session") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.saveSession) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['session-erstellen'];
    __VLS_styleScopedClasses['session-name'];
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
            addedPlayers: addedPlayers,
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
