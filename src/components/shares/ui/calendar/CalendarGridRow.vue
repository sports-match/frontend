<template>
  <CalendarGridRow :class="cn('flex', props.class)" v-bind="forwardedProps">
    <slot />
  </CalendarGridRow>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';

const props = defineProps<CalendarGridRowProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>
