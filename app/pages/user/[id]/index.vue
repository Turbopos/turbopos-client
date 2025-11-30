<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useGetUser from "~/composables/user/useGetUser";
import useUpdateUser from "~/composables/user/useUpdateUser";
import type { CreateUserRequest } from "~/types";

const route = useRoute();

const id = route.params.id;
const { result, error: getError, loading: getLoading } = useGetUser(id);
const { execute, loading: updateLoading, error: updateError } = useUpdateUser();

const error = computed(() => getError.value || updateError.value);
const loading = computed(() => getLoading.value || updateLoading.value);

async function onSubmit(values: CreateUserRequest) {
  await execute({
    id,
    ...values,
  });

  navigateTo("/user");
}
</script>

<template>
  <Heading
    back
    title="Edit Karyawan"
    :breadcrumbs="[
      {
        name: 'Data Karyawan',
        to: '/user',
      },
      {
        name: 'Edit Karyawan',
        to: '/user',
      },
    ]"
  ></Heading>
  <KaryawanSaveForm
    is-edit
    :loading="loading"
    :user="result?.user"
    @save="onSubmit"
  ></KaryawanSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
