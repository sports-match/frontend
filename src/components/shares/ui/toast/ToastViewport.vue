<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', props.class)" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { ToastViewport, type ToastViewportProps } from 'reka-ui';

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>
