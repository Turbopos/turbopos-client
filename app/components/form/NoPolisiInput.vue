<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: string];
}>();

const nomor = ref("");
const prefix = ref("");
const suffix = ref("");

const value = computed(() => {
  return `${prefix.value} ${nomor.value} ${suffix.value}`.trim();
});

function handleValue() {
  const values = props.modelValue?.split(" ") || [];

  if (values.length < 3) {
    return;
  }

  nomor.value = values[1] || "";
  prefix.value = values[0] || "";
  suffix.value = values[2] || "";
}

function handleValueChange() {
  emits("update:modelValue", value.value);
}

watch(() => props.modelValue, handleValue);
watch(value, handleValueChange);

onMounted(handleValue);
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <Input placeholder="XX" class="w-20" v-model="prefix"></Input>
    <Input class="flex-1" placeholder="Nomor" v-model="nomor"></Input>
    <Input placeholder="XX" class="w-20" v-model="suffix"></Input>
  </div>
</template>
