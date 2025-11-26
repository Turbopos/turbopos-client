<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { Pagination } from "./ui/pagination";

const props = defineProps<{
  limit?: number;
  total?: number;
  page?: number;
}>();

const emits = defineEmits<{
  "update:page": [number: number];
}>();

const page = useVModel(props, "page", emits);
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <Pagination
      v-model:page="page"
      v-slot="{ page }"
      :items-per-page="limit || 10"
      :total="total || 0"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationEllipsis :index="4" />

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>
