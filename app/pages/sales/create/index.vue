<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import SalesTransactionCreateForm from "~/components/sales-transaction/SalesTransactionCreateForm.vue";
import useCreateSalesTransaction from "~/composables/sales-transaction/useCreateSalesTransaction";
import type { CreateSalesTransactionRequest } from "~/types";

const { execute, loading, error } = useCreateSalesTransaction();

async function onSubmit(values: CreateSalesTransactionRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/sales");
  }
}
</script>

<template>
  <Heading back title="Tambah Penjualan"></Heading>
  <SalesTransactionCreateForm
    :loading="loading"
    @save="onSubmit"
  ></SalesTransactionCreateForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
