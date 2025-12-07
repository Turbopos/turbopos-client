<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import SettingSaveForm from "~/components/setting/SettingSaveForm.vue";
import { useGetSetting } from "~/composables/setting/useGetSetting";
import { useUpdateSetting } from "~/composables/setting/useUpdateSetting";
import type { UpdateSettingRequest } from "~/types";

const { result } = useGetSetting();
const { execute, loading: updateLoading, error } = useUpdateSetting();

async function onSubmit(values: UpdateSettingRequest) {
  await execute(values);
}
</script>

<template>
  <Heading
    back
    title="Pengaturan"
    :breadcrumbs="[
      {
        name: 'Pengaturan',
        to: '/setting',
      },
    ]"
  ></Heading>

  <Card v-if="result?.setting">
    <CardContent>
      <div class="grid grid-cols-1 gap-6">
        <div>
          <Label class="text-sm font-medium text-muted-foreground">Nama</Label>
          <p class="text-lg font-semibold">
            {{ result.setting.nama }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground">Email</Label>
          <p class="text-lg font-semibold">
            {{ result.setting.email }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground"
            >Telepon</Label
          >
          <p class="text-lg font-semibold">
            {{ result.setting.telepon }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground"
            >Alamat</Label
          >
          <p class="text-lg font-semibold">
            {{ result.setting.alamat }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  <SettingSaveForm
    v-if="result"
    :setting="result.setting"
    :loading="updateLoading"
    @save="onSubmit"
  />
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
