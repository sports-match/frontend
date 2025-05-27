<template>
  <div
    v-if="isLoading"
    class="w-full h-full fixed top-0 left-0 bg-white/50 z-50"
  >
    <div class="flex justify-center items-center mt-[50vh]">
      <div class="border-gray-300 size-20 animate-spin rounded-full border-8 border-t-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isLoading } from '@/composables/loading';
</script>
