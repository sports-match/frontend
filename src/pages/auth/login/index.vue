<template>
  <PublicLayout>
    <template #title>
      Sign in
    </template>
    <template #subtitle>
      Log in with your existing credentials.
    </template>
    <FormLogin />
    <div class="text-center text-xs text-muted-foreground pt-4">
      © 2025 sportrevive.com
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { FormLogin } from '@/components/auth/index';
import PublicLayout from '@/components/layouts/public/Layout.vue';
</script>
