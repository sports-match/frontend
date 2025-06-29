<template>
  <div :class="cn('grid gap-16', $attrs.class ?? '')">
    <div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div class="w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm">
        <!-- Logo -->
        <div class="flex justify-center">
          <img src="@/assets/images/main-logo.png" alt="Logo" class="h-20 w-20 object-contain">
        </div>
        <div class="flex flex-col items-center text-center">
          <h2 class="text-2xl font-semibold">
            <slot name="title" />
          </h2>
          <p class="text-sm text-muted-foreground ">
            <slot name="subtitle" />
          </p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils';
</script>
