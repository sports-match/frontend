<template>
  <StepperRoot
    v-slot="slotProps"
    :class="cn(
      'flex gap-2',
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>

<script lang="ts" setup>
import type { StepperRootEmits, StepperRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/utils/shadcn';
import { reactiveOmit } from '@vueuse/core';
import { StepperRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<StepperRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<StepperRootEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>
