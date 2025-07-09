<template>
  <div class="grid gap-16">
    <form @submit="onSubmit">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <Label for="username">
            Username
          </Label>
          <Input
            id="username"
            v-model="formData.username"
            :disabled="isLoading"
            required
          />
        </div>
        <div>
          <Label for="nickname">
            Nickname
          </Label>
          <Input
            id="nickname"
            v-model="formData.nickName"
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
            v-model="formData.email"
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
            v-model="formData.phone"
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
            v-model="formData.password"
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
          <RouterLink :to="`/auth/login?redirect=${redirect}`" class="text-primary">
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
import { register } from '@/api/user';
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Label } from '@/components/shares/ui/label';
import { notify } from '@/composables/notify';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { user, redirect } = route.query;

const isLoading = ref(false);

const formData = ref({
  username: '',
  nickName: '',
  email: '',
  phone: '',
  password: '',
  userType: user || 'PLAYER',
});

watch(
  () => route.query.user,
  (newVal) => {
    formData.value.userType = newVal || 'PLAYER';
  },
  { immediate: true },
);

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  try {
    const { data } = await register(formData.value);
    router.push({ name: 'VerifyEmailPage', query: { email: data.email, redirect } });
  } catch (error) {
    notify.error(error as string);
  } finally {
    isLoading.value = false;
  }
}
</script>
