<template>
  <ComboboxAnchor
    v-bind="forwarded"
    :class="cn('w-full', props.class)"
  >
    <slot />
  </ComboboxAnchor>
</template>

<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>
