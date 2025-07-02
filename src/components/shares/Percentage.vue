<template>
  <div class="relative w-10 h-10">
    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
      <!-- Background circle -->
      <circle
        class="text-gray-200"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
        cx="18"
        cy="18"
        r="15.9155"
      />
      <!-- Progress circle -->
      <circle
        class="text-green-500 transition-all duration-500"
        :class="getColor"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
        cx="18"
        cy="18"
        r="15.9155"
        :stroke-dasharray="`${Math.round(Number(percentage))}, 100`"
      />
    </svg>
    <div class="absolute text-xs inset-0 flex items-center justify-center text-green-500 font-semibold">
      {{ Math.round(Number(percentage)) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  percentage: {
    type: [Number, String],
    default: 0,
  },
  status: {
    type: String,
    default: 'default',
  },
});

const statusColor = computed(() => {
  return {
    publish: 'bg-green-100 dark:bg-green-900',
    private: 'bg-red-100 dark:bg-red-900',
    pending: 'bg-yellow-100 dark:bg-yellow-900',
    indigo: 'bg-indigo-100 dark:bg-indigo-900',
    warning: 'bg-orange-100 dark:bg-orange-900',
    completed: 'bg-blue-100 dark:bg-blue-900',
    default: 'bg-gray-100 dark:bg-gray-900',
  };
});

const getColor = computed(() => {
  return statusColor.value[props.status.value] || statusColor.value.default;
});
</script>
