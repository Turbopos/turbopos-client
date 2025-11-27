<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import SalesTransactionCreateForm from "~/components/sales-transaction/SalesTransactionCreateForm.vue";
import useUpdateSalesTransaction from "~/composables/sales-transaction/useUpdateSalesTransaction";
import useGetSalesTransaction from "~/composables/sales-transaction/useGetSalesTransaction";
import type { UpdateSalesTransactionRequest } from "~/types";

const route = useRoute();
const id = Number(route.params.id);

const { result, loading: fetchLoading, error: fetchError } = useGetSalesTransaction(id);
const { execute, loading, error } = useUpdateSalesTransaction(id);

async function onSubmit(values: UpdateSalesTransactionRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo(`/sales/${id}`);
  }
}
</script>

<template>
  <Heading back :title="`Edit Transaksi Penjualan - ${result?.sales_transaction?.kode || ''}`"></Heading>

  <!-- Loading State -->
  <div v-if="fetchLoading" class="flex justify-center py-8">
    <Spinner class="w-8 h-8" />
  </div>

  <!-- Error State -->
  <div v-else-if="fetchError" class="text-center py-8">
    <p class="text-destructive">{{ fetchError.message }}</p>
    <Button @click="refresh" variant="outline" class="mt-4">
      Coba Lagi
    </Button>
  </div>

  <!-- Edit Form -->
  <div v-else-if="result?.sales_transaction">
    <SalesTransactionCreateForm
      :sales-transaction="result.sales_transaction"
      :is-edit="true"
      :loading="loading"
      @save="onSubmit"
    ></SalesTransactionCreateForm>
    <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
  </div>

  <!-- Not Found State -->
  <div v-else class="text-center py-8">
    <p class="text-muted-foreground">Transaksi penjualan tidak ditemukan</p>
    <Button as-child variant="outline" class="mt-4">
      <NuxtLink to="/sales">
        Kembali ke List
      </NuxtLink>
    </Button>
  </div>
</template>