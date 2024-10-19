import { ref, watch } from 'vue';
import router from '../../router';
import Allert from '../../components/Allert.vue';
import $ from 'jquery';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const playerName = ref('');
const selectedProfilePicture = ref(null);
const showAllert = ref(false); // Steuere die Sichtbarkeit des Allerts
const allertTitle = ref('');
const allertMessage = ref('');
// Profilbilder importieren
import profile1 from '../../assets/Profilbilder/ProfilBild1.png';
import profile2 from '../../assets/Profilbilder/ProfilBild2.png';
import profile3 from '../../assets/Profilbilder/ProfilBild3.png';
import profile4 from '../../assets/Profilbilder/ProfilBild4.png';
import profile5 from '../../assets/Profilbilder/ProfilBild5.png';
import profile6 from '../../assets/Profilbilder/ProfilBild6.png';
import profile7 from '../../assets/Profilbilder/ProfilBild7.png';
import profile8 from '../../assets/Profilbilder/ProfilBild8.png';
import profile9 from '../../assets/Profilbilder/ProfilBild9.png';
import profile10 from '../../assets/Profilbilder/ProfilBild10.png';
import Weyo from '../../assets/Profilbilder/Weyo.png';
// Array mit Profilbildern
const profilePictures = [
    Weyo,
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
    profile9,
    profile10
];
// Funktion zur Umwandlung der Bild-URL in ein Base64-Bild
const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'Anonymous'; // Wichtig für die CORS-Politik
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL('image/png'); // Hier kannst du das gewünschte Format angeben
            resolve(base64); // Gebe das gesamte Base64-Format zurück
        };
        img.onerror = (error) => reject(error);
    });
};
const selectProfilePicture = (picture) => {
    selectedProfilePicture.value = picture;
};
const goHome = () => {
    playerName.value = ''; // Zurücksetzen des Spielernamens
    selectedProfilePicture.value = null; // Zurücksetzen des Profilbilds
    router.push('/'); // Navigiere zur Startseite
};
const SaveAndHome = async () => {
    if (playerName.value && selectedProfilePicture.value) {
        // Hier verwenden wir das ausgewählte Profilbild direkt
        const base64Image = await getBase64Image(selectedProfilePicture.value); // Verwende die URL, um das Bild in Base64 umzuwandeln
        const newPlayer = {
            name: playerName.value,
            profilePicture: base64Image, // Verwende den Base64-String direkt
        };
        const playerJson = JSON.stringify(newPlayer);
        $.ajax({
            url: '/api/createSpieler',
            method: 'POST',
            contentType: 'application/json',
            data: playerJson,
            dataType: 'json',
        }).done((response) => {
        }).fail((jqXHR, textStatus, errorThrown) => {
        });
        // Setze den Alert-Text und zeige ihn an
        allertTitle.value = `Spieler ${playerName.value} erstellt!`;
        allertMessage.value = `Spieler ${playerName.value} mit Profilbild erstellt!`;
        showAllert.value = true;
        // Warten auf das Schließen des Alerts
        await new Promise((resolve) => {
            const closeAlert = () => {
                showAllert.value = false; // Setze showAllert zurück
                resolve(); // Auflösen des Promises
            };
            watch(showAllert, (newValue) => {
                if (!newValue) {
                    closeAlert();
                }
            });
        });
        // Nach dem Schließen des Alerts zur Startseite navigieren
        playerName.value = '';
        selectedProfilePicture.value = null;
        router.push('/');
    }
    else {
        // Fehler-Alert
        allertTitle.value = 'Fehler';
        allertMessage.value = 'Bitte einen Spielernamen und ein Profilbild auswählen!';
        showAllert.value = true;
        // Warten auf das Schließen des Alerts
        await new Promise((resolve) => {
            const closeAlert = () => {
                showAllert.value = false; // Setze showAllert zurück
                resolve(); // Auflösen des Promises
            };
            watch(showAllert, (newValue) => {
                if (!newValue) {
                    closeAlert();
                }
            });
        });
    }
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
    __VLS_styleScopedClasses['profile-img'];
    __VLS_styleScopedClasses['buttons'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("create-player") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Spielername eingeben"), });
    (__VLS_ctx.playerName);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("profile-pictures") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("pictures") }, });
    for (const [picture, index] of __VLS_getVForSourceType((__VLS_ctx.profilePictures))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.selectProfilePicture(picture);
                } }, ...{ class: ((['profile-img', { selected: __VLS_ctx.selectedProfilePicture === picture }])) }, src: ((picture)), alt: ("Profilbild"), });
    }
    if (__VLS_ctx.showAllert) {
        // @ts-ignore
        [Allert,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Allert, new Allert({ ...{ 'onClose': {} }, isVisible: ((__VLS_ctx.showAllert)), message: ((__VLS_ctx.allertMessage)), title: ((__VLS_ctx.allertTitle)), }));
        const __VLS_1 = __VLS_0({ ...{ 'onClose': {} }, isVisible: ((__VLS_ctx.showAllert)), message: ((__VLS_ctx.allertMessage)), title: ((__VLS_ctx.allertTitle)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_5;
        const __VLS_6 = {
            onClose: (...[$event]) => {
                if (!((__VLS_ctx.showAllert)))
                    return;
                __VLS_ctx.showAllert = false;
            }
        };
        let __VLS_2;
        let __VLS_3;
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(Allert, __VLS_1);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("navigation-buttons") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.SaveAndHome) }, ...{ class: ("buttons") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.goHome) }, ...{ class: ("buttons") }, });
    __VLS_styleScopedClasses['create-player'];
    __VLS_styleScopedClasses['profile-pictures'];
    __VLS_styleScopedClasses['pictures'];
    __VLS_styleScopedClasses['selected'];
    __VLS_styleScopedClasses['profile-img'];
    __VLS_styleScopedClasses['navigation-buttons'];
    __VLS_styleScopedClasses['buttons'];
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
            Allert: Allert,
            playerName: playerName,
            selectedProfilePicture: selectedProfilePicture,
            showAllert: showAllert,
            allertTitle: allertTitle,
            allertMessage: allertMessage,
            profilePictures: profilePictures,
            selectProfilePicture: selectProfilePicture,
            goHome: goHome,
            SaveAndHome: SaveAndHome,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
