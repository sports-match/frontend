<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'a',
});
</script>
