<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="cn('relative flex cursor-default gap-2 select-none justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-hidden data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0', props.class)"
  >
    <slot />
  </ComboboxItem>
</template>

<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
