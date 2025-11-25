<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import DistributorSaveForm from "~/components/distributor/DistributorSaveForm.vue";
import useCreateDistributor from "~/composables/distributor/useCreateDistributor";
import type { CreateDistributorRequest } from "~/types";

const { execute, loading, error } = useCreateDistributor();

async function onSubmit(values: CreateDistributorRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/distributor");
  }
}
</script>

<template>
  <Heading back title="Tambah Distributor"></Heading>
  <DistributorSaveForm :loading="loading" @save="onSubmit"></DistributorSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>