import type { Ref } from 'vue';
import { set } from '@vueuse/core';
import { ref } from 'vue';

export const isLoading: Ref<boolean> = ref(false);

export const setLoading = (state: boolean) => set(isLoading, state);
