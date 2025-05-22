<template>
  <div class="h-screen flex justify-center lg:max-w-none lg:px-0">
    <div class="lg:p-8 lg:mt-20">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex">
          <!-- <img src="@/assets/images/main-logo.png" width="250" class="mx-auto"> -->
        </div>

        <FormLogin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormLogin } from '@/components/auth/index';
</script>
