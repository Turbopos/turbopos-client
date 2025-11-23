<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-vue-next";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Loader2
    role="status"
    aria-label="Loading"
    :class="cn('size-4 animate-spin', props.class)"
  />
</template>
