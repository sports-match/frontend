<template>
  <div class="flex items-center gap-2">
    <!-- View mode -->
    <span v-if="!editing">
      {{ modelValue || placeholder }}
      <Button class="ml-2" variant="outline" size="icon" @click="startEditing">
        <Edit class="size-3 text-primary" />
      </Button>
    </span>

    <!-- Edit mode -->
    <div v-else class="flex items-center gap-1">
      <Input
        ref="inputRef"
        v-model="inputValue"
        type="number"
        :placeholder="placeholder"
        class="w-20"
        @keydown.enter="save"
        @keydown.esc="cancel"
      />
      <Button variant="ghost" class="text-green-500 text-sm" size="icon" @click="save">
        <Check class="size-3" />
      </Button>
      <Button variant="ghost" class="text-destructive text-sm" size="icon" @click="cancel">
        <X class="size-3" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/shares/ui/button';
import { Input } from '@/components/shares/ui/input';
import { Check, Edit, X } from 'lucide-vue-next';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const editing = ref(false);
const inputValue = ref<string | number>('');
const inputRef = ref<HTMLInputElement>();

watch(editing, async (val) => {
  if (val) {
    inputValue.value = props.modelValue;
    // await nextTick();
    // inputRef.value?.focus();
  }
});

function startEditing() {
  editing.value = true;
}

function save() {
  emit('update:modelValue', inputValue.value);
  editing.value = false;
}

function cancel() {
  editing.value = false;
}
</script>

<style scoped>
/* Hide input number arrows */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
