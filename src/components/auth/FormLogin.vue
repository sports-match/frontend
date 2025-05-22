<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-3">
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
          />
        </div>
        <div class="grid gap-1">
          <Label for="email">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          {{ $t('label.button.login') }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';

import { Label } from '@/components/shares/ui/label';
import { useAuthentication } from '@/composables';
import { cn } from '@/utils';
import { set } from '@vueuse/core';
import { Loader2 as LucideSpinner } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    const { accessToken } = useAuthentication();
    set(accessToken, 'auth-token');
    router.push({ name: 'DashboardPage' });
  }, 3000);
}
</script>
