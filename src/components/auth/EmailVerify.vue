<template>
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

    <!-- Retry link -->
    <!-- <div v-if="timer === 0" class="text-sm">
      Didn't get the code?
      <button class="text-blue-600 hover:underline" @click="resendCode">
        Resend
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const code = ref('');
const timer = ref(30);
let interval = null;

const formattedTimer = computed(() => `${String(timer.value).padStart(2, '0')}`);

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
  // trigger resend logic here (e.g., API call)
  startTimer();
}

function submitCode() {
  // handle code submission
  console.log('Submitted Code:', code.value);
  router.push('/auth/club-select'); // redirect to login or next step
}

onMounted(() => {
  startTimer();
});
</script>
