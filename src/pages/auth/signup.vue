<template>
  <PublicLayout>
    <template #title>
      <span>
        Sign Up
      </span>
    </template>
    <template #subtitle>
      <span>
        Create your new account to join competitive ladder events houted by verified acandemies and clubs.
      </span>
    </template>
    <SignUpForm />
    <div class="text-center text-xs text-muted-foreground pt-4">
      © 2025 sportreview.com
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import SignUpForm from '@/components/auth/Signup.vue';
import PublicLayout from '@/components/layouts/public/Layout.vue';
</script>
