<template>
  <Separator
    data-sidebar="separator"
    :class="cn('mx-2 w-auto bg-sidebar-border', props.class)"
  >
    <slot />
  </Separator>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import Separator from '@/components/shares/ui/separator/Separator.vue';
import { cn } from '@/utils/shadcn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
