<template>
  <CalendarGrid
    :class="cn('w-full border-collapse space-y-1', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGrid>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
