<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import ProductSaveForm from "~/components/product/ProductSaveForm.vue";
import useCreateProduct from "~/composables/product/useCreateProduct";
import type { CreateProductRequest } from "~/types";

const { execute, loading, error } = useCreateProduct();

async function onSubmit(values: CreateProductRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/product");
  }
}
</script>

<template>
  <Heading back title="Tambah Barang/Jasa"></Heading>
  <ProductSaveForm :loading="loading" @save="onSubmit"></ProductSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
