<template>
  <AccordionItem
    v-bind="forwardedProps"
    :class="cn('border-b', props.class)"
  >
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
