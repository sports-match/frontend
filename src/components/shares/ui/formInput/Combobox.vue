<template>
  <FormField
    v-slot="{ componentField }"
    :name
  >
    <FormItem
      v-auto-animate
      class="flex flex-col"
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

      <Combobox
        :by="itemTitle"
        :multiple
        :disabled
      >
        <FormControl>
          <ComboboxAnchor as-child>
            <ComboboxTrigger as-child>
              <Button
                variant="outline"
                class="w-full justify-between overflow-hidden text-left"
              >
                <div v-if="!multiple">
                  {{ displayValue(componentField.modelValue) }}
                </div>
                <div v-if="multiple">
                  <div
                    v-for="item in displayValue(componentField.modelValue)"
                    :key="item"
                    class="mr-1"
                    variant="outline"
                  >
                    {{ item }}
                  </div>
                </div>

                <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-30" />
              </Button>
            </ComboboxTrigger>
          </ComboboxAnchor>
        </FormControl>
        <ComboboxList class="max-h-[40vh] overflow-hidden">
          <div class="relative w-full items-center">
            <ComboboxInput
              class="w-full pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
              :placeholder
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
              <Search class="size-4 text-muted-foreground" />
            </span>
          </div>

          <ComboboxEmpty>
            Nothing found.
          </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, i) in props.options"
              :key="`${i}-${option[itemKey]}`"
              :value="option"
              :text-value="option[itemTitle]"
              @select="() => handleSetValue(componentField, option)"
            >
              {{ option[itemTitle] }}

              <Check
                v-if="multiple ? componentField.modelValue?.includes(option[itemKey]) : componentField.modelValue === option[itemKey]"
                class="w-4 h-4"
              />
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import type { GenericObject, Path, PathValue } from 'vee-validate';
import type { Ref } from 'vue';
import Button from '@/components/shares/ui/button/Button.vue';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from '@/components/shares/ui/combobox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shares/ui/form';
import { Check, ChevronDown, Search } from 'lucide-vue-next';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  description?: string;
  label?: string;
  name: string;
  options: Array<Record<string, any>>;
  itemKey?: string;
  itemTitle?: string;
  placeholder?: string;
  multiple?: boolean;
  setFieldValue: (value: PathValue<GenericObject, Path<GenericObject>>, value2: unknown) => void;
  required?: boolean;
  disabled?: boolean;
}>(), {
  itemKey: 'id',
  itemTitle: 'label',
  multiple: false,
  required: false,
  disabled: false,
});

const emit = defineEmits(['onSelect']);
const { itemKey, itemTitle, placeholder, label, name, multiple } = props;
const selectedValue: Ref<Record<string, any> | Array<Record<string, any>>> = ref([]);

function displayValue(value: Record<string, any> | Array<Record<string, any>>) {
  if (multiple) {
    return value?.map((item: Record<string, any>) => props.options.find(option => option[itemKey] === item)?.[itemTitle]);
  }
  return props.options.find(option => option[itemKey] === value)?.[itemTitle];
}

function handleSetValue({ name, modelValue }: { name: string; modelValue?: Record<string, any> | Array<Record<string, any>> }, val: any) {
  if (multiple) {
    if (!modelValue)
      modelValue = [];
    const idx = modelValue.indexOf(val[itemKey]);

    if (idx > -1) {
      selectedValue.value = modelValue.filter((_: Record<string, any>, i: number) => i !== idx);
    } else {
      selectedValue.value = Array.from(new Set([...(Array.isArray(modelValue) ? modelValue : []), val[itemKey]]));
    }
    props.setFieldValue(name, selectedValue.value);
  } else {
    props.setFieldValue(name, val[itemKey]);
    selectedValue.value = val[itemKey];
  }
  emit('onSelect', selectedValue.value);
}
</script>
