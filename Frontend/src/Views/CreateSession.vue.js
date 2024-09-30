import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Session State
const sessionData = ref({
    sessionName: '', // Sessionname leer initialisieren
    spielerIdListe: [], // Leere Liste von Spieler-IDs
});
// Alle Spieler abrufen
const spieler = ref([]);
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
// Spieler zur Session hinzufügen
const addPlayerToSession = (spielerId) => {
    if (!sessionData.value.spielerIdListe.includes(spielerId)) {
        sessionData.value.spielerIdListe.push(spielerId);
    }
    console.log('Spieler hinzugefügt:', sessionData.value.spielerIdListe);
};
// Spieler aus der Session entfernen
const removePlayerFromSession = (spielerId) => {
    const index = sessionData.value.spielerIdListe.indexOf(spielerId);
    if (index > -1) {
        sessionData.value.spielerIdListe.splice(index, 1);
    }
    console.log('Spieler entfernt:', sessionData.value.spielerIdListe);
};
// Session speichern
const saveSession = () => {
    if (sessionData.value.sessionName && sessionData.value.spielerIdListe.length > 0) {
        const sessionJson = JSON.stringify(sessionData.value);
        $.ajax({
            url: '/api/createSpielRunde',
            method: 'POST',
            contentType: 'application/json', // Content-Type als JSON
            data: sessionJson, // Session-Daten im Body
            dataType: 'json',
        })
            .done((response) => {
            console.log('Session erstellt:', response);
            // Session-ID aus dem Backend setzen
            //   sessionData.value.sessionId = response.sessionId;
            // Zurück zur Startseite nach Speichern der Session
            router.push('/');
        })
            .fail((jqXHR, textStatus, errorThrown) => {
            console.error('Fehler beim Erstellen der Session:', textStatus, errorThrown);
        });
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
    __VLS_styleScopedClasses['save-session'];
    __VLS_styleScopedClasses['buttons'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-erstellen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-name") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Sessionname eingeben"), });
    (__VLS_ctx.sessionData.sessionName);
    if (__VLS_ctx.spieler.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-list") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
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
                    } }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spieler.length > 0)))
                            return;
                        __VLS_ctx.removePlayerFromSession(spieler.spielerId);
                    } }, });
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
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['actions'];
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
            sessionData: sessionData,
            spieler: spieler,
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
