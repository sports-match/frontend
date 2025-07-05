<template>
  <transition name="pop">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale"
        role="dialog"
        aria-modal="true"
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{ state.title }}
        </h2>
        <p v-if="state.description" class="text-gray-600 dark:text-gray-300 mb-5">
          {{ state.description }}
        </p>
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            @click="handleCancel"
          >
            {{ state.cancelText }}
          </button>
          <button
            class="px-4 py-2 text-sm rounded-md transition" :class="[
              state.confirmVariant === 'destructive'
                ? 'bg-destructive text-white hover:bg-destructive/90'
                : 'bg-primary text-white hover:bg-primary/90',
            ]"
            @click="handleConfirm"
          >
            {{ state.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAlertDialogState } from '@/composables/useAlertDialog';

const { open, state, resolve } = useAlertDialogState();

function handleConfirm() {
  resolve(true);
  open.value = false;
}
function handleCancel() {
  resolve(false);
  open.value = false;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scale {
  animation: scaleIn 0.2s ease-out;
}
</style>
