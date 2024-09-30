import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const spieler = ref([]);
const fetchSpieler = async () => {
    try {
        const response = await axios.get('/api/getAlleSpieler');
        console.log('API Response:', response); // API Antwort überprüfen
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
            console.error('Erwartetes Array, aber erhalten:', spielerArray);
        }
        console.log('Spieler-Daten:', spieler.value);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Spieler:', error);
    }
};
onMounted(() => {
    fetchSpieler();
});
const goHome = () => {
    router.push('/'); // Navigiere zur Startseite
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-liste") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("titel") }, });
    if (__VLS_ctx.spieler.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-grid") }, });
        for (const [spieler] of __VLS_getVForSourceType((__VLS_ctx.spieler))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((spieler.spielerId)), ...{ class: ("spieler-item") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (spieler.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((spieler.profilePicture)), alt: ((`Profilbild von ${spieler.name}`)), ...{ class: ("profilbild") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['spieler-liste'];
    __VLS_styleScopedClasses['titel'];
    __VLS_styleScopedClasses['spieler-grid'];
    __VLS_styleScopedClasses['spieler-item'];
    __VLS_styleScopedClasses['profilbild'];
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
