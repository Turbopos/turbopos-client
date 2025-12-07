<script lang="ts" setup>
import type { UpdateSettingRequest, Setting } from "~/types/setting";
import { Save } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";

const props = defineProps<{
  setting?: Setting;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [value: UpdateSettingRequest];
}>();

const router = useRouter();

const validationSchema = toTypedSchema(
  object({
    nama: string().min(1, "Nama harus diisi"),
    email: string().email("Email tidak valid"),
    telepon: string().min(1, "Telepon harus diisi"),
    alamat: string().min(1, "Alamat harus diisi"),
  }),
);

const { handleSubmit, setValues } = useForm({
  validationSchema,
  initialValues: {
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
  },
});

function handleSettingValue() {
  if (props.setting) {
    setValues({
      nama: props.setting.nama,
      email: props.setting.email,
      telepon: props.setting.telepon,
      alamat: props.setting.alamat,
    });
  }
}

onMounted(handleSettingValue);
watch(() => props.setting, handleSettingValue);

const onSubmit = handleSubmit((values) => {
  emits("save", values as UpdateSettingRequest);
});
</script>

<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-5">
      <CardContent class="space-y-4">
        <FormGroup name="nama" label="Nama" v-slot="{ componentField }">
          <Input
            placeholder="Masukkan nama"
            v-bind="componentField"
          />
        </FormGroup>

        <FormGroup name="email" label="Email" v-slot="{ componentField }">
          <Input
            type="email"
            v-bind="componentField"
            placeholder="Masukkan email"
          />
        </FormGroup>

        <FormGroup name="telepon" label="Telepon" v-slot="{ componentField }">
          <Input
            v-bind="componentField"
            placeholder="Masukkan telepon"
          />
        </FormGroup>

        <FormGroup name="alamat" label="Alamat" v-slot="{ componentField }">
          <Input
            v-bind="componentField"
            placeholder="Masukkan alamat"
          />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex items-center gap-2">
        <Button type="button" @click="router.back" variant="outline">
          Batal
        </Button>
        <Button type="submit">
          <Spinner class="size-4" v-if="loading"></Spinner>
          <Save v-else class="size-4"></Save>
          Simpan Pengaturan
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>