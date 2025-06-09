<template>
  <PublicLayout>
    <template #title>
      <span>
        Verify email address
      </span>
    </template>
    <template #subtitle>
      <span>
        We've sent a 6-digit code to your phone/email. Please enter it below to continue.
      </span>
    </template>
    <div class="grid gap-16 text-center">
      <!-- Input + Timer -->
      <div class="relative">
        <Input
          v-model="code"
          type="text"
          maxlength="6"
          placeholder="Enter code here"
          class="pr-15 text-center"
        />
        <div v-if="timer > 0" class="absolute inset-y-0 right-2 flex items-center text-sm text-muted-foreground">
          <LucideSpinner class="mr-2 animate-spin size-4" />
          <span>{{ formattedTimer }}</span>
        </div>
        <div v-if="timer === 0" class="absolute inset-y-0 right-2 flex items-center">
          <button
            class="text-blue-600 hover:underline text-xs"
            @click="resendCode"
          >
            Resend
          </button>
        </div>
      </div>

      <!-- Verify Button -->
      <Button class="w-full" :disabled="!code" @click="submitCode">
        Verify
      </Button>
      <div class="text-center text-xs text-muted-foreground pt-4">
        © 2025 sportreview.com
      </div>
    </div>
  </PublicLayout>
</template>

<script setup lang="ts">
import { verifyEmail } from '@/api/user';
import PublicLayout from '@/components/layouts/public/Layout.vue';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { notify } from '@/composables/notify';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { email } = route.query;
const code = ref('');
const timer = ref(30);
let interval: number | undefined;

const formattedTimer = computed(() => `${String(timer.value).padStart(2, '0')}`);

onMounted(() => {
  startTimer();
});

function startTimer() {
  timer.value = 30;
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

function resendCode() {
  // trigger resend api
  startTimer();
}
async function submitCode() {
  try {
    if (!email)
      return;
    await verifyEmail({ email: email as string, code: code.value });
    router.push({ name: 'AuthLoginPage' });
    notify.success('Sign up successfully! Please Sign in.');
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
