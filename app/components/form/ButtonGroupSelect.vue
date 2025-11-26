<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { OptionItem } from "~/types";

const props = defineProps<{
  modelValue?: string;
  items: OptionItem[];
}>();

const emits = defineEmits<{
  "update:modelValue": [value: any];
}>();

const value = useVModel(props, "modelValue", emits);

function handleClick(val: OptionItem) {
  value.value = val.value;
}
</script>

<template>
  <ButtonGroup>
    <Button
      type="button"
      v-for="item in items"
      :key="item.value"
      @click="() => handleClick(item)"
      :variant="value == item.value ? 'default' : 'outline'"
    >
      {{ item.label }}
    </Button>
  </ButtonGroup>
</template>
