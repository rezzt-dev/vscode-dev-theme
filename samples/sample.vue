<!-- muestra de vue para revisar el resaltado de dark dev -->
<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ name: string; value?: number }>();
const emit = defineEmits<{ (e: 'pick', name: string): void }>();
const open = ref(false);
const label = computed(() => (open.value ? 'abierto' : `cerrado ${props.value ?? 0}`));
</script>

<template>
  <div class="slot" :class="{ open }" @click="emit('pick', name)">
    <span v-if="open">{{ label }}</span>
    <li v-for="step in [5, 10]" :key="step">{{ step }}</li>
  </div>
</template>

<style scoped>
.slot { color: #eee; }
.slot.open { opacity: 0.5; }
</style>
