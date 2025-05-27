<template>
  <div class="grid gap-16">
    <form @submit="onSubmit">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label for="fullname">
            Full Name
          </Label>
          <Input
            id="fullname"
            :disabled="isLoading"
            required
          />
        </div>
        <div class="grid gap-1">
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>
        <div>
          <Label for="phoneNumber">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+# #####-####"
            auto-capitalize="none"
            auto-complete="tel"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>
        <div class="grid gap-1">
          <Label for="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            auto-capitalize="none"
            auto-complete="new-password"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>
        <Button :disabled="isLoading">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign up
        </Button>
      </div>
    </form>
    <div class="flex flex-col items-center text-center">
      <p class="text-sm text-muted-foreground">
        Already have an account?
        <Button variant="link" size="sm" class="p-0 ml-2">
          <RouterLink to="/auth/login" class="text-primary">
            Sign in
          </RouterLink>
        </Button>
      </p>
      <p class="text-sm text-muted-foreground">
        Forgot your password?
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Label } from '@/components/shares/ui/label';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { ref } from 'vue';

const emit = defineEmits(['onSubmit']);
// const router = useRouter();
const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    // const { accessToken } = useAuthentication();
    // set(accessToken, 'auth-token');
    // router.push({ name: 'DashboardPage' });
    emit('onSubmit');
  }, 2000);
}
</script>
