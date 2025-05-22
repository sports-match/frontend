<template>
  <Primitive
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type SidebarMenuButtonVariants, sidebarMenuButtonVariants } from '.';

export type SidebarMenuButtonProps = {
  variant?: SidebarMenuButtonVariants['variant'];
  size?: SidebarMenuButtonVariants['size'];
  isActive?: boolean;
  class?: HTMLAttributes['class'];
} & PrimitiveProps;

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
});
</script>
