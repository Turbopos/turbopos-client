<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { Eye, EyeOff } from "lucide-vue-next";
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ Omit<InputHTMLAttributes, "type"> {
  modelValue?: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const showPassword = ref(false);

const modelValue = useVModel(props, "modelValue", emits);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="relative">
    <Input
      v-model="modelValue"
      :type="showPassword ? 'text' : 'password'"
      v-bind="$attrs"
      placeholder="********"
    />
    <div
      class="absolute right-0 top-0 bottom-0 flex items-center justify-center px-2"
    >
      <button type="button" @click="showPassword = !showPassword">
        <component :is="showPassword ? Eye : EyeOff" class="size-4"></component>
      </button>
    </div>
  </div>
</template>
