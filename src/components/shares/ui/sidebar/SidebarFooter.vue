<template>
  <div
    data-sidebar="footer"
    :class="cn('flex flex-col gap-2 p-2', props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
