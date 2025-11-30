<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useCreateUser from "~/composables/user/useCreateUser";
import type { CreateUserRequest } from "~/types";

const { execute, loading, error } = useCreateUser();

async function onSubmit(values: CreateUserRequest) {
  await execute(values);

  if (!error.value) {
    navigateTo("/user");
  }
}
</script>

<template>
  <Heading
    back
    title="Tambah Karyawan"
    :breadcrumbs="[
      {
        name: 'Data Karyawan',
        to: '/user',
      },
      {
        name: 'Tambah Karyawan',
        to: '/create',
      },
    ]"
  ></Heading>
  <KaryawanSaveForm :loading="loading" @save="onSubmit"></KaryawanSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
