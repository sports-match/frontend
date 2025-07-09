<template>
  <div :class="cn('grid gap-16', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label for="username">
            Username
          </Label>
          <Input
            id="username"
            v-model="formData.username"
            type="username"
            auto-capitalize="none"
            auto-complete="username"
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
            v-model="formData.password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>
        <Button :disabled="isLoading">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign in
        </Button>
      </div>
    </form>
    <div class="flex flex-col items-center text-center">
      <p class="text-sm text-muted-foreground">
        Not a member?
        <Button variant="link" size="sm" class="p-0 ml-2">
          <RouterLink :to="`/auth/signup?redirect=${redirect}`" class="text-primary">
            Sign up
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
import { login } from '@/api/user';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Label } from '@/components/shares/ui/label';
import { useAuthentication } from '@/composables';
import { isLoading } from '@/composables/loading';
import { notify } from '@/composables/notify';
import { useUserStore } from '@/stores';
import { cn } from '@/utils';
import { set } from '@vueuse/core';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const { query: { redirect } } = router.currentRoute.value;
const formData = ref({
  username: '',
  password: '',
});

// const isLoading = ref(false);
async function onSubmit() {
  try {
    const { data: { token: accessToken, ...rest } } = await login(formData.value);
    const { token } = useAuthentication();
    set(token, accessToken);
    userStore.setUserDetails(rest);
    router.push({ path: redirect?.toString() ?? '/dashboard', replace: true });
    notify.success('Login successful!');
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
