import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Dummy-Daten für die Session
const dummySession = {
    spielRundenNamen: "Test Session",
    spielrundenId: "12345",
    spielerListe: [
        { name: "Tom", profilBild: "https://via.placeholder.com/50" },
        { name: "Weyo", profilBild: "https://via.placeholder.com/50" },
        { name: "Jan", profilBild: "https://via.placeholder.com/50" },
        { name: "Mathis", profilBild: "https://via.placeholder.com/50" }
    ]
};
// Router Setup
const route = useRoute();
const router = useRouter();
// Reaktive Variable für die Session
const session = ref(dummySession); // Verwende die Dummy-Daten
// Funktion zum Zurückgehen zur Übersicht
const goBack = () => {
    router.push('/');
};
// Funktion zum Aktualisieren der Verluste (z.B. zum Testen)
const incrementLosses = (playerName, change) => {
    // Hier kannst du die Logik zum Aktualisieren der Verluste implementieren
    console.log(`Aktualisiere Verluste für ${playerName}: ${change}`);
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
    __VLS_styleScopedClasses['back-button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-detail") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("session-title") }, });
    (__VLS_ctx.session?.spielRundenNamen);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
    for (const [player] of __VLS_getVForSourceType((__VLS_ctx.session?.spielerListe))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((player.name)), ...{ class: ("spieler") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (player.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilBild)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.incrementLosses(player.name, -1);
                } }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.incrementLosses(player.name, 1);
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
            incrementLosses: incrementLosses,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
