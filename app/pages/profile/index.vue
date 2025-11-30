<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useUpdateProfile from "~/composables/auth/useUpdateProfile";
import type { CreateUserRequest, User } from "~/types";

const { execute, loading, error } = useUpdateProfile();
const auth = useAuthStore();

async function onSubmit(values: CreateUserRequest) {
  await execute({
    ...values,
    id: auth.user?.id as number,
  });

  auth.setUser({
    ...(auth.user as User),
    ...values,
  });
}
</script>

<template>
  <Heading
    back
    title="Profil Saya"
    :breadcrumbs="[
      {
        name: 'Profil Saya',
        to: '/profile',
      },
    ]"
  ></Heading>

  <Card>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label class="text-sm font-medium text-muted-foreground">Nama</Label>
          <p class="text-lg font-semibold">
            {{ auth.user?.nama }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground"
            >Username</Label
          >
          <p class="text-lg font-semibold">
            {{ auth.user?.username }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  <KaryawanSaveForm
    is-edit
    is-me
    :loading="loading"
    :user="auth.user as User"
    @save="onSubmit"
  ></KaryawanSaveForm>
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
