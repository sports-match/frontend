<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="cn('-mx-1 h-px bg-border', props.class)"
  >
    <slot />
  </ComboboxSeparator>
</template>

<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { ComboboxSeparator } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
