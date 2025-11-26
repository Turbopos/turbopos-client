<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import CustomerSaveForm from "~/components/customer/CustomerSaveForm.vue";
import useGetCustomer from "~/composables/customer/useGetCustomer";
import useUpdateCustomer from "~/composables/customer/useUpdateCustomer";
import type { CreateCustomerRequest } from "~/types";

const route = useRoute();
const id = route.params.id;
const { result, error: getError, loading: getLoading } = useGetCustomer(id);
const {
  execute,
  loading: updateLoading,
  error: updateError,
} = useUpdateCustomer();

const error = computed(() => getError.value || updateError.value);
const loading = computed(() => getLoading.value || updateLoading.value);

async function onSubmit(values: CreateCustomerRequest) {
  await execute({
    id: Number(id),
    ...values,
  });

  navigateTo(`/customer/${id}`);
}
</script>

<template>
  <Heading back title="Edit Customer"></Heading>
  <CustomerSaveForm
    is-edit
    :loading="loading"
    :customer="result?.customer"
    @save="onSubmit"
  ></CustomerSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
