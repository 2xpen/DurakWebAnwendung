<template>
  <div v-if="isVisible" class="alert-container">
    <div class="alert">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="close">Schließen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '../router';
import { defineProps, defineEmits } from 'vue';

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
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
