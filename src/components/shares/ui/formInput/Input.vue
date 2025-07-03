<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
  >
    <FormItem
      v-auto-animate
      :class="$attrs.class"
    >
      <FormLabel class="flex items-center">
        <span>
          {{ label }}
          <span
            v-if="required"
            class="text-destructive"
          >*</span>
        </span>
      </FormLabel>
      <FormControl>
        <Input
          :disabled
          :type
          :placeholder
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shares/ui/form';
import { Input } from '@/components/shares/ui/input';

withDefaults(defineProps<{
  description?: string;
  label?: string;
  placeholder?: string;
  type: 'text' | 'number' | 'password' | 'file';
  name: string;
  required?: boolean;
  disabled?: boolean;
  modelValue?: string | number | File;
}>(), {
  placeholder: '',
  required: false,
  disabled: false,
});
</script>
