<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui';
import { type ToastProps, toastVariants } from '.';

const props = defineProps<ToastProps>();

const emits = defineEmits<ToastRootEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
