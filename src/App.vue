<template>
  <router-view />
  <Toaster
    expand
    close-button
    rich-colors
  />
  <SpinnerLoading />
</template>

<script setup lang="ts">
import SpinnerLoading from '@/components/layouts/SpinnerLoading.vue';
import { Toaster } from '@/components/shares/ui/sonner';
</script>
