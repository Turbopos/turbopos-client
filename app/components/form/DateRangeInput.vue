<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  startDate?: string;
  endDate?: string;
}>();

const emits = defineEmits<{
  "update:startDate": [value: string];
  "update:endDate": [value: string];
}>();

const startDate = useVModel(props, "startDate", emits);
const endDate = useVModel(props, "endDate", emits);
</script>

<template>
  <div class="flex w-full">
    <Input
      type="date"
      placeholder="Tanggal Dari"
      :max="endDate"
      v-model="startDate"
      class="flex-1 rounded-r-none"
    />
    <div
      class="border-t border-b flex items-center justify-center text-sm text-muted-foreground bg-muted/50 w-10"
    >
      S/D
    </div>
    <Input
      type="date"
      placeholder="Tanggal Sampai"
      :min="startDate"
      v-model="endDate"
      class="flex-1 rounded-l-none"
    />
  </div>
</template>
