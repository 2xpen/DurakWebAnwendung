import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sessions = ref([]);
const goHome = () => {
    router.push('/');
};
const getLimitedPlayers = (spielerListe) => {
    return spielerListe.slice(0, 4);
};
const fetchSessions = async () => {
    try {
        const response = await axios.get('/api/getAlleSpielrundenAuswahlView');
        sessions.value = response.data.data;
        console.log(sessions.value, "<-------empfangene session");
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Sessions:', error);
    }
};
const startSession = (session) => {
    router.push({ name: 'sessionDetail', params: { spielRundenId: session.spielRundenId } });
};
onMounted(() => {
    fetchSessions();
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
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((session.spielRundenId)), ...{ class: ("session-row") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-name") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (session.spielRundenName);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
            for (const [player, index] of __VLS_getVForSourceType((__VLS_ctx.getLimitedPlayers(session.spielerInRundeAnzeigenDTOS)))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: ("spieler") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
                (player.name);
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilePicture)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
            }
            if (session.spielerInRundeAnzeigenDTOS.length > 4) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mehr-spieler") }, });
                (session.spielerInRundeAnzeigenDTOS.length - 4);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("start-button-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.sessions.length > 0)))
                            return;
                        __VLS_ctx.startSession(session);
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
