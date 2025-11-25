<script lang="ts" setup>
import { Role } from "~/utils/constants";

const props = defineProps<{
  role: Role;
}>();

const variant = computed(() => {
  return {
    [Role.Admin]: "default",
    [Role.Mekanik]: "destructive",
    [Role.Operator]: "secondary",
  }[props.role];
});
</script>

<template>
  <Badge :variant="variant as any" class="uppercase">{{ props.role }}</Badge>
</template>
