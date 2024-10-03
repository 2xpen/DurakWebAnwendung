import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import bockRunde from '../assets/bockRunde.png';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const spielrunde = ref();
const bockrundeStarted = ref(false);
const clickCount = ref(0); // Track clicks
const bockrundeImageVisible = ref(false);
//   spielrunde.value = {
//    spielRundenName: "Testspielrunde",
//     spielRundenId: "jklshdfghsdkljfgh",
//    spielerInRundeAnzeigenDTOS: [
//      {
//        spielerId: "1",
//        name: "T",
//        durakStand: 2,
//        profilePicture: Weyo
//       },
//     {
//        spielerId: "2",
//       name: "Jan",
//        durakStand: 0,
//       profilePicture: Weyo
//     },
//      {
//       spielerId: "3",
//       name: "Mathis",
//       durakStand: 1,
//         profilePicture: Weyo
//      },
//      {
//       spielerId: "4",
//       name: "Tom",
//       durakStand: 1,
//         profilePicture: Weyo
//      }
//    ]
// };
let __VLS_typeProps;
const props = defineProps();
const fetchSessionDetails = async () => {
    const sessionId = props.spielRundenId;
    try {
        const response = await axios.get(`/api/getSpielrundeById?spielRundenId=${sessionId}`);
        spielrunde.value = response.data.data;
        console.log(spielrunde.value, "session.value");
        console.log(spielrunde.value.spielRundenName, "spielRundenName");
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Session-Details:', error);
    }
};
const checkClickLimit = () => {
    if (clickCount.value >= 3) {
        router.push('/SeeAllSessions');
    }
};
const goBack = () => {
    router.push('/');
};
const calculateLooses = async (player) => {
    const sessionId = props.spielRundenId;
    let wert;
    if (!bockrundeStarted.value) {
        wert = 1;
        console.log("keine Bockrunde", wert);
    }
    else {
        wert = 2;
        clickCount.value++;
    }
    const payload = {
        spielRundenId: sessionId,
        spielerId: player.spielerId,
        verrechnungszahl: wert
    };
    console.log(payload);
    try {
        const response = await axios.post('/api/changedurakstand', payload);
        player.durakStand = response.data.data.durakStand;
        console.log(player.durakStand, "Aktualisierter player.durakStand");
        console.log('Spieler-ID:', response.data.spielerId);
    }
    catch (error) {
        console.log('Fehler', error);
    }
    checkClickLimit();
};
const removeLosses = async (player) => {
    const sessionId = props.spielRundenId;
    let wert;
    if (bockrundeStarted.value == false) {
        wert = -1;
    }
    else {
        wert = -2;
        clickCount.value--;
    }
    const payload = {
        spielRundenId: sessionId,
        spielerId: player.spielerId,
        verrechnungszahl: wert
    };
    console.log(payload);
    try {
        const response = await axios.post('/api/changedurakstand', payload);
        player.durakStand = response.data.data.durakStand;
    }
    catch (error) {
        console.log('Fehler', error);
    }
    checkClickLimit();
};
onMounted(() => {
    fetchSessionDetails();
});
const startBockrunde = () => {
    bockrundeStarted.value = true;
    clickCount.value = 0;
    bockrundeImageVisible.value = true;
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
    if (__VLS_ctx.spielrunde) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-detail") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("session-title") }, });
        (__VLS_ctx.spielrunde.spielRundenName || 'Keine Session gefunden');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bockrunde-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.startBockrunde) }, ...{ class: ("bockrundeKnopf") }, });
        if (__VLS_ctx.bockrundeImageVisible) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.bockRunde)), alt: ("Bockrunde"), ...{ class: ("bockrunde-image") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
        for (const [player] of __VLS_getVForSourceType((__VLS_ctx.spielrunde.spielerInRundeAnzeigenDTOS))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((player.spielerId)), ...{ class: ("spieler") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (player.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilePicture)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (player.durakStand);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielrunde)))
                            return;
                        __VLS_ctx.calculateLooses(player);
                    } }, ...{ class: ("duDurakKnopf") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielrunde)))
                            return;
                        __VLS_ctx.removeLosses(player);
                    } }, ...{ class: ("korrekturKnopf") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goBack) }, ...{ class: ("back-button") }, });
    }
    __VLS_styleScopedClasses['session-detail'];
    __VLS_styleScopedClasses['session-title'];
    __VLS_styleScopedClasses['bockrunde-container'];
    __VLS_styleScopedClasses['bockrundeKnopf'];
    __VLS_styleScopedClasses['bockrunde-image'];
    __VLS_styleScopedClasses['spieler-container'];
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['buttons-container'];
    __VLS_styleScopedClasses['duDurakKnopf'];
    __VLS_styleScopedClasses['korrekturKnopf'];
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
            bockRunde: bockRunde,
            spielrunde: spielrunde,
            bockrundeImageVisible: bockrundeImageVisible,
            goBack: goBack,
            calculateLooses: calculateLooses,
            removeLosses: removeLosses,
            startBockrunde: startBockrunde,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
