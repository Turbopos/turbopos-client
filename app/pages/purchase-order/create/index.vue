<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import PurchaseOrderCreateForm from "~/components/purchase-order/PurchaseOrderCreateForm.vue";
import useCreatePurchaseOrder from "~/composables/purchase-order/useCreatePurchaseOrder";
import type { CreatePurchaseOrderRequest } from "~/types";

const { execute, loading, error } = useCreatePurchaseOrder();

async function onSubmit(values: CreatePurchaseOrderRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/purchase-order");
  }
}
</script>

<template>
  <Heading
    back
    title="Tambah Belanjaan"
    :breadcrumbs="[
      {
        name: 'Transaksi Pembelian',
        to: '/purchase-order',
      },
      {
        name: 'Tambah Belanjaan',
        to: '/purchase-order/create',
      },
    ]"
  ></Heading>
  <PurchaseOrderCreateForm
    :loading="loading"
    @save="onSubmit"
  ></PurchaseOrderCreateForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
