import { ref, watch } from 'vue';
import router from '../router';
import Allert from '../components/Allert.vue';
import $ from 'jquery';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const playerName = ref('');
const selectedProfilePicture = ref(null);
const showAllert = ref(false); // Steuere die Sichtbarkeit des Allerts
const allertTitle = ref('');
const allertMessage = ref('');
// Profilbilder importieren
import profile1 from '../assets/Profilbilder/ProfilBild1.png';
import profile2 from '../assets/Profilbilder/ProfilBild2.png';
import profile3 from '../assets/Profilbilder/ProfilBild3.png';
import profile4 from '../assets/Profilbilder/ProfilBild4.png';
import profile5 from '../assets/Profilbilder/ProfilBild5.png';
import profile6 from '../assets/Profilbilder/ProfilBild6.png';
import profile7 from '../assets/Profilbilder/ProfilBild7.png';
import profile8 from '../assets/Profilbilder/ProfilBild8.png';
import profile9 from '../assets/Profilbilder/ProfilBild9.png';
import profile10 from '../assets/Profilbilder/ProfilBild10.png';
// Array mit Profilbildern
const profilePictures = [
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
// Funktion zur Umwandlung des Bildes in Base64
const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Den Base64-String ohne Präfix extrahieren
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
        // FileReader sollte die Datei lesen, nicht einen Blob aus einem string erstellen
        reader.readAsDataURL(file);
    });
};
const selectProfilePicture = (picture) => {
    selectedProfilePicture.value = picture;
    console.log(selectedProfilePicture.value, "selected ProfilePicture");
};
const goHome = () => {
    playerName.value = ''; // Zurücksetzen des Spielernamens
    selectedProfilePicture.value = null; // Zurücksetzen des Profilbilds
    router.push('/'); // Navigiere zur Startseite
};
const SaveAndHome = async () => {
    if (playerName.value && selectedProfilePicture.value) {
        // Hier verwenden wir das ausgewählte Profilbild direkt
        const base64Image = selectedProfilePicture.value; // Nimm das Bild direkt als Base64-String
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
            console.log('Erfolg:', response);
            console.log(response.statusIndicator);
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.error('Fehler:', textStatus, errorThrown);
        });
        console.log("json-Object Spieler", playerJson);
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
                } }, src: ((picture)), alt: ("Profilbild"), ...{ class: ((['profile-img', { selected: __VLS_ctx.selectedProfilePicture === picture }])) }, });
    }
    if (__VLS_ctx.showAllert) {
        // @ts-ignore
        [Allert,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(Allert, new Allert({ ...{ 'onClose': {} }, title: ((__VLS_ctx.allertTitle)), message: ((__VLS_ctx.allertMessage)), isVisible: ((__VLS_ctx.showAllert)), }));
        const __VLS_1 = __VLS_0({ ...{ 'onClose': {} }, title: ((__VLS_ctx.allertTitle)), message: ((__VLS_ctx.allertMessage)), isVisible: ((__VLS_ctx.showAllert)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
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
