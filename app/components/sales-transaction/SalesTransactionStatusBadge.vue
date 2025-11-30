<script lang="ts" setup>
import type { SalesTransactionStatus } from "~/types";

const props = defineProps<{
  status: SalesTransactionStatus;
}>();

const variantMap: Record<SalesTransactionStatus, string> = {
  pending: "outline",
  completed: "default",
  cancelled: "destructive",
  in_progress: "secondary",
};

const labelMap: Record<SalesTransactionStatus, string> = {
  pending: "Pending",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  in_progress: "Dalam Proses",
};
</script>

<template>
  <Badge :variant="variantMap[props.status] as any">
    {{ labelMap[status] }}
  </Badge>
</template>
