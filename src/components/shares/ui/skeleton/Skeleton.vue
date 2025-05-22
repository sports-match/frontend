<template>
  <div :class="cn('animate-pulse rounded-md bg-muted', props.class)" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';

type SkeletonProps = {
  class?: HTMLAttributes['class'];
};

const props = defineProps<SkeletonProps>();
</script>
