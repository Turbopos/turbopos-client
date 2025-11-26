<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import useGetCategories from "~/composables/category/useGetCategories";

interface Props {
  placeholder?: string;
  modelValue?: any;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  "update:modelValue": [value: any];
}>();

const value = useVModel(props, "modelValue", emits);

const { result: categoriesResult } = useGetCategories();
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="w-full">
      <SelectValue
        class="w-full"
        :placeholder="placeholder || 'Pilih kategori'"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="category in categoriesResult?.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.nama }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
