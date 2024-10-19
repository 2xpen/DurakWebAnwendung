import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../../router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const spielerList = ref([]);
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
// const spieler = ref<Player[]>([
//   { name: 'Tom', profilePicture: profile1 },
//   { name: 'Weyo', profilePicture: profile2 },
//   { name: 'Jan', profilePicture: profile3 },
//   { name: 'Mathis', profilePicture: profile4 },
//   { name: 'Mobamboficker', profilePicture: profile5 },
//   { name: 'Peter Jökel', profilePicture: profile6 },
//   { name: 'Spieler 7', profilePicture: profile7 },
//   { name: 'Spieler 8', profilePicture: profile8 },
//   { name: 'Spieler 9', profilePicture: profile9 },
//   { name: 'Spieler 10', profilePicture: profile10 },
// ]);
const fetchSpieler = async () => {
    try {
        const response = await axios.get('/api/getAlleSpieler');
        // Zugriff auf das Array mit den Spielern
        const spielerArray = response.data.data;
        console.log(spielerArray, "<------- empfangene Spieler");
        if (Array.isArray(spielerArray)) {
            spielerArray.forEach((spielerData) => {
                // Spieler zur spieler-Referenz hinzufügen
                spielerList.value.push({
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
const bearbeiten = (spieler) => {
    // Logik für Bearbeiten hinzufügen
};
const loeschen = (spieler) => {
    // Logik für Löschen hinzufügen
};
const goDetailSeite = (spieler) => {
    router.push({
        name: 'spielerdetails',
        params: { spielerId: spieler.spielerId } // Übergebe nur die ID des Spielers
    });
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
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['buttons'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-liste") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("titel") }, });
    if (__VLS_ctx.spielerList.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("spieler-grid") }, });
        for (const [spieler] of __VLS_getVForSourceType((__VLS_ctx.spielerList))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((spieler.spielerId)), ...{ class: ("spieler") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (spieler.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bild-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ((`Profilbild von ${spieler.name}`)), src: ((spieler.profilePicture)), ...{ class: ("profilbild") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("actions") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielerList.length > 0)))
                            return;
                        __VLS_ctx.goDetailSeite(spieler);
                    } }, ...{ class: ("actions button") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.spielerList.length > 0)))
                            return;
                        __VLS_ctx.loeschen(spieler);
                    } }, ...{ class: ("actions button") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['spieler-liste'];
    __VLS_styleScopedClasses['titel'];
    __VLS_styleScopedClasses['spieler-grid'];
    __VLS_styleScopedClasses['spieler'];
    __VLS_styleScopedClasses['bild-container'];
    __VLS_styleScopedClasses['profilbild'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['button'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['button'];
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
            spielerList: spielerList,
            loeschen: loeschen,
            goDetailSeite: goDetailSeite,
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
