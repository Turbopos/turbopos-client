<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import CustomerSaveForm from "~/components/customer/CustomerSaveForm.vue";
import useCreateCustomer from "~/composables/customer/useCreateCustomer";
import type { CreateCustomerRequest } from "~/types";

const { execute, loading, error } = useCreateCustomer();

async function onSubmit(values: CreateCustomerRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/customer");
  }
}
</script>

<template>
  <Heading
    back
    title="Tambah Customer"
    :breadcrumbs="[
      {
        name: 'Data Customer',
        to: '/customer',
      },
      {
        name: 'Tambah Customer',
        to: '/customer/create',
      },
    ]"
  ></Heading>
  <CustomerSaveForm :loading="loading" @save="onSubmit"></CustomerSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
