<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import DistributorSaveForm from "~/components/distributor/DistributorSaveForm.vue";
import useGetDistributor from "~/composables/distributor/useGetDistributor";
import useUpdateDistributor from "~/composables/distributor/useUpdateDistributor";
import type { CreateDistributorRequest } from "~/types";

const route = useRoute();
const id = route.params.id;
const { result, error: getError, loading: getLoading } = useGetDistributor(id);
const {
  execute,
  loading: updateLoading,
  error: updateError,
} = useUpdateDistributor();

const error = computed(() => getError.value || updateError.value);
const loading = computed(() => getLoading.value || updateLoading.value);

async function onSubmit(values: CreateDistributorRequest) {
  await execute({
    id: Number(id),
    ...values,
  });
}
</script>

<template>
  <Heading back title="Edit Distributor"></Heading>
  <DistributorSaveForm
    is-edit
    :loading="loading"
    :distributor="result?.distributor"
    @save="onSubmit"
  ></DistributorSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
