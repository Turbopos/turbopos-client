<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import type { OptionItem } from "~/types";

interface Props {
  items: OptionItem[];
  modelValue?: any;
  placeholder?: string;
  withAll?: boolean;
  disabled?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", payload: any): void;
}>();

const modelValue = useVModel(props, "modelValue", emits);
const placeholder = props.placeholder || "Pilih opsi";
</script>

<template>
  <Select v-model="modelValue" :disabled="disabled">
    <SelectTrigger class="w-full">
      <SelectValue
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-if="withAll" value="all"> Semua </SelectItem>
      <SelectItem v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
