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
defineProps({
  percentage: {
    type: [Number, String],
    default: 0,
  },
});
</script>
