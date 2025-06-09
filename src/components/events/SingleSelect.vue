<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Trigger -->
    <div
      class="w-full flex items-center justify-between border rounded-md px-3 py-2 min-h-[42px] sm:min-h-[48px] cursor-pointer bg-white"
      @click="toggleDropdown"
    >
      <span v-if="selectedOption" class="truncate text-sm">{{ selectedOption.name }}</span>
      <span v-else class="text-gray-500 text-sm">{{ placeholder }}</span>

      <svg
        class="w-4 h-4 opacity-50 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full border bg-white rounded-md shadow-md max-h-60 overflow-auto"
    >
      <div class="relative">
        <input
          v-model="inputValue"
          type="text"
          :placeholder="searchPlaceholder"
          class="pl-9 pr-3 py-2 w-full text-sm border-b focus:outline-none"
        >
        <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor"
          >
            <path
              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      <div v-if="!filteredOptions || filteredOptions?.length === 0" class="text-gray-500 p-2 text-sm">
        Not found
      </div>

      <ul>
        <li
          v-for="item in filteredOptions"
          :key="item.value"
          class="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export type DropdownOption = {
  [key: string]: any;
};

const props = defineProps<{
  options: DropdownOption[];
  modelValue: DropdownOption | null;
  placeholder?: string;
  searchPlaceholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: DropdownOption | null): void;
}>();

const dropdownRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const inputValue = ref('');

const selectedOption = computed(() => props.modelValue);

const filteredOptions = computed(() =>
  props.options?.filter(
    item =>
      item.name.toLowerCase().includes(inputValue.value.toLowerCase()),
  ) || [],
);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectItem(item: DropdownOption) {
  console.log(item);

  emit('update:modelValue', item);
  isOpen.value = false;
  inputValue.value = '';
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
