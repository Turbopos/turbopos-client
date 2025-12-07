<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import SettingSaveForm from "~/components/setting/SettingSaveForm.vue";
import { useUpdateSetting } from "~/composables/setting/useUpdateSetting";
import type { UpdateSettingRequest } from "~/types";

const settingStore = useSettingStore();
const { execute, loading: updateLoading, error } = useUpdateSetting();

const setting = computed(() => settingStore.setting);

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

  <Card v-if="setting">
    <CardContent>
      <div class="grid grid-cols-1 gap-6">
        <div>
          <Label class="text-sm font-medium text-muted-foreground">Nama</Label>
          <p class="text-lg font-semibold">
            {{ setting.nama }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground">Email</Label>
          <p class="text-lg font-semibold">
            {{ setting.email }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground"
            >Telepon</Label
          >
          <p class="text-lg font-semibold">
            {{ setting.telepon }}
          </p>
        </div>
        <div>
          <Label class="text-sm font-medium text-muted-foreground"
            >Alamat</Label
          >
          <p class="text-lg font-semibold">
            {{ setting.alamat }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>

  <SettingSaveForm
    v-if="setting"
    :setting="setting"
    :loading="updateLoading"
    @save="onSubmit"
  />
  <span class="text-sm text-destructive" v-if="error">{{ error.message }}</span>
</template>
