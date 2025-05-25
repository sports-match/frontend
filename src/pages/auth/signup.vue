<template>
  <PublicLayout>
    <template #title>
      <span v-if="!submitted">
        Sign Up
      </span>
      <span v-else>
        Verify email address
      </span>
    </template>
    <template #subtitle>
      <span v-if="!submitted">
        Create your new account to join competitive ladder events houted by verified acandemies and clubs.
      </span>
      <span v-else>
        We've sent a 6-digit code to your phone/email. Please enter it below to continue.
      </span>
    </template>
    <SignUpForm v-if="!submitted" @on-submit="() => { submitted = true }" />
    <EmailVerify v-else @on-resend="submitted = false" />
    <div class="text-center text-xs text-muted-foreground pt-4">
      © 2025 sportreview.com
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import EmailVerify from '@/components/auth/EmailVerify.vue';
import SignUpForm from '@/components/auth/Signup.vue';
import PublicLayout from '@/components/layouts/public/Layout.vue';
import { ref } from 'vue';

const submitted = ref(false);
</script>
