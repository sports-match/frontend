<template>
  <ComboboxEmpty
    v-bind="delegatedProps"
    :class="cn('py-6 text-center text-sm', props.class)"
  >
    <slot />
  </ComboboxEmpty>
</template>

<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { ComboboxEmpty } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
