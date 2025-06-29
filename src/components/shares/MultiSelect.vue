<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Selected Tags & Trigger -->
    <div
      class="w-full flex flex-wrap items-center gap-2 border rounded-md px-3 py-2 min-h-[42px] sm:min-h-[48px] cursor-pointer bg-white"
      @click="toggleDropdown"
    >
      <template v-if="selectedDisplayItems?.length > 0">
        <div
          v-for="item in selectedDisplayItems"
          :key="getOptionValue(item)"
          class="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md max-w-full truncate"
        >
          <span class="truncate">{{ getOptionLabel(item) }}</span>
          <button
            class="ml-1 text-red-500 hover:text-red-600"
            @click.stop="removeItem(item)"
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
      <span v-else class="text-gray-500 text-sm">{{ placeholder }}</span>

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

      <!-- Empty state -->
      <div v-if="filteredOptions.length === 0" class="text-gray-500 p-2 text-sm">
        {{ emptyText }}
      </div>

      <!-- Options -->
      <ul>
        <li
          v-for="item in filteredOptions"
          :key="getOptionValue(item)"
          class="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer flex justify-between items-center"
          @click="addItem(item)"
        >
          {{ getOptionLabel(item) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  options: any[];
  modelValue: any[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  valueKey?: string; // property name for value (e.g. 'id' or 'value')
  labelKey?: string; // property name for label (e.g. 'name' or 'label')
  returnType?: 'object' | 'value'; // 'object' (default) returns array of objects, 'value' returns array of values
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
}>();

const placeholder = props.placeholder ?? 'Select items';
const searchPlaceholder = props.searchPlaceholder ?? 'Search...';
const emptyText = props.emptyText ?? 'Not found';

function getOptionLabel(item: any) {
  return props.labelKey ? item[props.labelKey] : item.label ?? item.name ?? String(item);
}
function getOptionValue(item: any) {
  return props.valueKey ? item[props.valueKey] : item.value ?? item.id ?? String(item);
}

const inputValue = ref('');
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const filteredOptions = computed(() =>
  props.options.filter(
    item =>
      getOptionLabel(item).toLowerCase().includes(inputValue.value.toLowerCase())
      && !props.modelValue?.some(selected =>
        (props.returnType === 'value'
          ? selected === getOptionValue(item)
          : getOptionValue(selected) === getOptionValue(item)
        ),
      ),
  ),
);

function addItem(item: any) {
  let newValue;
  if (props.returnType === 'value') {
    newValue = [...props.modelValue, getOptionValue(item)];
  } else {
    newValue = [...props.modelValue, item];
  }
  emit('update:modelValue', newValue);
  inputValue.value = '';
  isOpen.value = false;
}

function removeItem(item: any) {
  let newValue;
  if (props.returnType === 'value') {
    newValue = props.modelValue.filter(i => i !== getOptionValue(item));
  } else {
    newValue = props.modelValue.filter(i => getOptionValue(i) !== getOptionValue(item));
  }
  emit('update:modelValue', newValue);
}

// For displaying selected tags, map value to object if returnType is 'value'
const selectedDisplayItems = computed(() => {
  if (props.returnType === 'value') {
    return props.modelValue
      .map(val => props.options.find(opt => getOptionValue(opt) === val))
      .filter(Boolean);
  }
  return props.modelValue;
});

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
