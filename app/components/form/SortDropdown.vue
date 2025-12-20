<script lang="ts" setup>
import type { OptionItem, SortValue } from "~/types";
import Listdown from "./Listdown.vue";

const props = defineProps<{
  modelValue: SortValue;
  items: OptionItem[];
}>();

const emits = defineEmits<{
  "update:modelValue": [value: SortValue];
}>();

const mappedItems = computed(() => {
  let items: OptionItem<SortValue>[] = [];

  for (const item of props.items) {
    items = [
      ...items,
      {
        label: `${item.label} (ASC)`,
        value: {
          field: item.value,
          order: "asc",
        },
      },
      {
        label: `${item.label} (DESC)`,
        value: {
          field: item.value,
          order: "desc",
        },
      },
    ];
  }

  return items;
});
</script>

<template>
  <Listdown
    :items="mappedItems"
    :model-value="modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
    placeholder="Urutkan"
  >
  </Listdown>
</template>
