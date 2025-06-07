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
    <SignUpForm v-if="!submitted" @on-submit="onSubmitted" />
    <EmailVerify v-else @on-submit="submitVerifyEmail" />
    <div class="text-center text-xs text-muted-foreground pt-4">
      © 2025 sportreview.com
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { verifyEmail } from '@/api/user';
import EmailVerify from '@/components/auth/EmailVerify.vue';
import SignUpForm from '@/components/auth/Signup.vue';
import PublicLayout from '@/components/layouts/public/Layout.vue';
import { notify } from '@/composables/notify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const submitted = ref(false);
const submitEmail = ref('');

function onSubmitted(email: string) {
  submitEmail.value = email;
  submitted.value = true;
}

async function submitVerifyEmail(code: string) {
  try {
    await verifyEmail({ email: submitEmail.value, code });
    submitted.value = false;
    router.push({ name: 'AuthLoginPage' });
    notify.success('Sign up successfully! Please Sign in.');
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
