<template>
  <tbody :class="cn('[&_tr:last-child]:border-0', props.class)">
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
