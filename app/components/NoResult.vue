<script setup lang="ts">
import { Notebook } from "lucide-vue-next";

defineProps<{
  message: string;
  icon?: typeof Notebook;
}>();
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <div class="text-center">
      <component
        :is="icon || Notebook"
        class="inline size-24 mb-3 text-muted-foreground"
      ></component>
      <div class="text-center">
        <p class="text-sm text-muted-foreground">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
