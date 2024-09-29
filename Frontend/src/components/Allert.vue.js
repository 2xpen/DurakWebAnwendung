import { defineProps, defineEmits } from 'vue';
const { defineSlots, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Definiere die Props
const props = defineProps({
    title: String,
    message: String,
    isVisible: Boolean,
});
// Definiere die Emit-Funktion
const emit = defineEmits();
const close = () => {
    emit('close');
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        title: String,
        message: String,
        isVisible: Boolean,
    },
    emits: {},
});
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
    if (__VLS_ctx.isVisible) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("alert-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("alert") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.message);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.close) }, });
    }
    __VLS_styleScopedClasses['alert-container'];
    __VLS_styleScopedClasses['alert'];
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
            close: close,
        };
    },
    emits: {},
    props: {
        title: String,
        message: String,
        isVisible: Boolean,
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        title: String,
        message: String,
        isVisible: Boolean,
    },
});
;
