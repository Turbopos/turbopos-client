<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import ProductSaveForm from "~/components/product/ProductSaveForm.vue";
import useGetProduct from "~/composables/product/useGetProduct";
import useUpdateProduct from "~/composables/product/useUpdateProduct";
import type { CreateProductRequest } from "~/types";

const route = useRoute();
const id = route.params.id;
const {
  result,
  error: getError,
  loading: getLoading,
} = useGetProduct(Number(id));
const {
  execute,
  loading: updateLoading,
  error: updateError,
} = useUpdateProduct();

const error = computed(() => getError.value || updateError.value);
const loading = computed(() => getLoading.value || updateLoading.value);

async function onSubmit(values: CreateProductRequest) {
  await execute({
    id: Number(id),
    ...values,
  });

  if (!updateError.value) {
    navigateTo("/product");
  }
}
</script>

<template>
  <Heading
    back
    title="Edit Barang/Jasa"
    :breadcrumbs="[
      {
        name: 'Data Barang & Jasa',
        to: '/product',
      },
      {
        name: 'Edit Barang/Jasa',
        to: '/product',
      },
    ]"
  ></Heading>
  <ProductSaveForm
    is-edit
    :loading="loading"
    :product="result?.product"
    @save="onSubmit"
  ></ProductSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
