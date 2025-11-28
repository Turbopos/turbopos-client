<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface Props {
  modelValue?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  "update:modelValue": [value: string];
}>();

const value = useVModel(props, "modelValue", emits);

const currentYear = new Date().getFullYear();

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString().padStart(2, "0"),
  label: monthNames[i],
}));

const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
  const year = (2000 + i).toString();
  return { value: year, label: year };
});

const selectedMonth = ref("");
const selectedYear = ref("");

watch(
  value,
  (newValue) => {
    if (newValue) {
      const [year, month] = newValue.split("-");
      selectedMonth.value = month as string;
      selectedYear.value = year as string;
    } else {
      selectedMonth.value = "";
      selectedYear.value = "";
    }
  },
  { immediate: true },
);

watch([selectedMonth, selectedYear], () => {
  if (selectedMonth.value && selectedYear.value) {
    value.value = `${selectedYear.value}-${selectedMonth.value}`;
  } else {
    value.value = "";
  }
});

watch(selectedYear, () => {
  if (selectedYear.value && !selectedMonth.value) {
    selectedMonth.value = (new Date().getMonth() + 1 + "")
      .toString()
      .padStart(2, "0");
  }
});
</script>

<template>
  <div class="grid grid-cols-3 w-full">
    <Select v-model="selectedMonth">
      <SelectTrigger class="w-full col-span-2 border-r-0 rounded-r-none">
        <SelectValue placeholder="Bulan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in monthOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
    <Select v-model="selectedYear">
      <SelectTrigger class="w-full rounded-l-none">
        <SelectValue placeholder="Tahun" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in yearOptions.reverse()"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
