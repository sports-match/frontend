<template>
  <ComboboxInput
    v-bind="forwarded"
    :class="cn('flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  >
    <slot />
  </ComboboxInput>
</template>

<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<ComboboxInputEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
