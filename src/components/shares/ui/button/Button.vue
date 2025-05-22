<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { cn } from '@/utils';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { buttonVariants } from '.';

type Props = {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'];
  as?: string;
} & PrimitiveProps;

withDefaults(defineProps<Props>(), {
  as: 'button',
});
</script>
