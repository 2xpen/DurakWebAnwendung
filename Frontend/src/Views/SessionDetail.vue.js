import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { defineProps } from 'vue';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const router = useRouter();
const spielrunde = ref();
//  spielrunde.value = {
//   spielRundenName: "Testspielrunde",
//    spielRundenId: "jklshdfghsdkljfgh",
//   spielerInRundeAnzeigenDTOS: [
//     {
//       spielerId: "1",
//       name: "Max Mustermann",
//       durakStand: 2,
//       profilePicture: "https://via.placeholder.com/50"
//      },
//    {
//       spielerId: "2",
//      name: "Erika Musterfrau",
//       durakStand: 0,
//      profilePicture: "https://via.placeholder.com/50"
//    },
//     {
//      spielerId: "3",
//      name: "Hans Meier",
//      durakStand: 1,
//        profilePicture: "https://via.placeholder.com/50"
//     }
//   ]
// };
let __VLS_typeProps;
const props = defineProps();
const fetchSessionDetails = async () => {
    const sessionId = props.spielRundenId;
    try {
        const response = await axios.get(`/api/getSpielrundeById?spielRundenId=${sessionId}`);
        spielrunde.value = response.data;
        console.log(spielrunde.value, "session.value");
        console.log(spielrunde.value.spielRundenName, "spielRundenName");
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Session-Details:', error);
    }
};
const goBack = () => {
    router.push('/');
};
const addLosses = async (player, change) => {
    // if (player.durakStand !== undefined) {
    //   player.durakStand += change; 
    //   const payload = { 
    //     playerId: player.spielerId,  
    //     durakStand: player.durakStand 
    //   };
    //   try {
    //     const response = await axios.post('/api/updateDurakStand', payload);
    //     console.log(`Erfolgreich aktualisiert: ${player.spielerId} mit DurakStand: ${player.durakStand}`);
    //   } catch (error) {
    //     console.error('Fehler beim Aktualisieren des DurakStand:', error);
    //   }
    // } else {
    //   console.error('durakStand ist nicht definiert');
    // }
};
const removeLosses = (player, change) => {
    // if (player.durakStand !== undefined) {
    //   player.durakStand -= change; 
    // } else {
    //   console.error('durakStand ist nicht definiert');
    // }
};
onMounted(() => {
    fetchSessionDetails();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    if (__VLS_ctx.spielrunde) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("session-detail") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("session-title") }, });
        (__VLS_ctx.spielrunde.spielRundenName || 'Keine Session gefunden');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-container") }, });
        for (const [player] of __VLS_getVForSourceType((__VLS_ctx.spielrunde.spielerInRundeAnzeigenDTOS))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((player.spielerId)), ...{ class: ("spieler") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (player.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (player.durakStand);
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((player.profilePicture)), alt: ((`Profilbild von ${player.name}`)), ...{ class: ("profilbild") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("buttons-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielrunde)))
                            return;
                        __VLS_ctx.addLosses(player, 1);
                    } }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielrunde)))
                            return;
                        __VLS_ctx.removeLosses(player, -1);
                    } }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goBack) }, ...{ class: ("back-button") }, });
    }
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
            spielrunde: spielrunde,
            goBack: goBack,
            addLosses: addLosses,
            removeLosses: removeLosses,
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
