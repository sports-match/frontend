<template>
  <router-view />
  <Toaster
    expand
    close-button
    rich-colors
  />
  <AlertDialog />
  <SpinnerLoading />
</template>

<script setup lang="ts">
import SpinnerLoading from '@/components/layouts/SpinnerLoading.vue';
import AlertDialog from '@/components/shares/AlertDialog.vue';
import { Toaster } from '@/components/shares/ui/sonner';
</script>
