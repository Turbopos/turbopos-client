<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import OpnameCreateForm from "~/components/opname/OpnameCreateForm.vue";
import useCreateOpname from "~/composables/opname/useCreateOpname";
import type { CreateOpnameRequest } from "~/types";

const { execute, loading, error } = useCreateOpname();

async function onSubmit(values: CreateOpnameRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/opname");
  }
}
</script>

<template>
  <Heading
    back
    title="Tambah Stok Opname"
    :breadcrumbs="[
      {
        name: 'Transaksi Stok Opname',
        to: '/opname',
      },
      {
        name: 'Tambah Stok Opname',
        to: '/opname/create',
      },
    ]"
  ></Heading>
  <OpnameCreateForm :loading="loading" @save="onSubmit"></OpnameCreateForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
