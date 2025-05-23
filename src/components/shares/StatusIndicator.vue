<template>
  <span
    class="inline-flex items-center justify-center text-xs p-1 px-3 rounded-lg"
    :class="[bgColor, textColor]"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: string | { code: string };
}>();

const statusColors = {
  publish: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-300', dot: 'bg-green-500' },
  private: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-300', dot: 'bg-red-500' },
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-300', dot: 'bg-yellow-500' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-800 dark:text-indigo-300', dot: 'bg-indigo-500' },
  warning: { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-800 dark:text-orange-300', dot: 'bg-orange-500' },
  completed: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-300', dot: 'bg-blue-500' },
  default: { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-800 dark:text-gray-300', dot: 'bg-gray-500' },
};

const resolvedStatus = computed(() => {
  return (props.status as string)?.toLowerCase();
});

const bgColor = computed(() => statusColors[resolvedStatus.value as keyof typeof statusColors]?.bg || statusColors.default.bg);
const textColor = computed(() => statusColors[resolvedStatus.value as keyof typeof statusColors]?.text || statusColors.default.text);
</script>
