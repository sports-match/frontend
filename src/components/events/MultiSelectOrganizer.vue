<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Selected Tags & Trigger -->
    <div
      class="w-full flex flex-wrap items-center gap-2 border rounded-md px-3 py-2 min-h-[42px] sm:min-h-[48px] cursor-pointer bg-white"
      @click="toggleDropdown"
    >
      <template v-if="selectedValues.length > 0">
        <div
          v-for="item in selectedValues"
          :key="item.value"
          class="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md max-w-full truncate"
        >
          <span class="truncate">{{ item.label }}</span>
          <button
            class="ml-1 text-red-500 hover:text-red-600"
            @click.stop="removeItem(item.value)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </template>
      <span v-else class="text-gray-500 text-sm">Other Orgenizers</span>

      <svg
        class="ml-auto w-4 h-4 opacity-50 shrink-0"
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
    <div v-if="isOpen" class="absolute z-10 mt-1 w-full border bg-white rounded-md shadow-md max-h-60 overflow-auto">
      <!-- Search input -->
      <div class="relative">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Search for Players Name"
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

      <!-- Empty state -->
      <div v-if="filteredOptions.length === 0" class="text-gray-500 p-2 text-sm">
        Not found
      </div>

      <!-- Options -->
      <ul>
        <li
          v-for="item in filteredOptions"
          :key="item.value"
          class="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer flex justify-between items-center"
          @click="addItem(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

// Options
const options = [
  { value: '1', label: 'Alice Johnson' },
  { value: '2', label: 'Brian Smith' },
  { value: '3', label: 'Carla Nguyen' },
  { value: '4', label: 'David Lee' },
  { value: '5', label: 'Emily Chen' },
];

const selectedValues = ref<typeof options>([]);
const inputValue = ref('');
const isOpen = ref(false);

// Toggle dropdown
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

// Filter out already-selected and search match
const filteredOptions = computed(() =>
  options.filter(
    item =>
      item.label.toLowerCase().includes(inputValue.value.toLowerCase())
      && !selectedValues.value.some(selected => selected.value === item.value),
  ),
);

// Add item
function addItem(item: typeof options[0]) {
  if (!selectedValues.value.find(f => f.value === item.value)) {
    selectedValues.value.push(item);
  }
  inputValue.value = '';
  isOpen.value = false;
}

// Remove item
function removeItem(value: string) {
  selectedValues.value = selectedValues.value.filter(item => item.value !== value);
}

// 🧠 Handle clicks outside
const dropdownRef = ref<HTMLElement | null>(null);
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

<style scoped>
/* Optional: smoother transitions */
</style>
