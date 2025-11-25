<script lang="ts" setup>
import type { CreateUserRequest, User } from "~/types/user";
import PasswordInput from "../form/PasswordInput.vue";
import { userRoleOptions } from "~/utils/constants";
import Listdown from "../form/Listdown.vue";
import { Save } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";

const props = defineProps<{
  isEdit?: boolean;
  user?: User;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [value: CreateUserRequest];
}>();

const router = useRouter();

const validationSchema = toTypedSchema(
  object({
    nama: string().min(1, "Nama harus diisi"),
    role: string().min(1, "Role harus dipilih"),
    username: string().min(1, "Username harus dipilih"),
    password: string().min(props.isEdit ? 0 : 1, "Password harus diisi"),
    password_confirmation: string(),
  }),
);

const { handleSubmit, setFieldError, setValues } = useForm({
  validationSchema,
  initialValues: {
    nama: "",
    role: "",
    username: "",
    password: "",
    password_confirmation: "",
  },
});

function handleUserValue() {
  if (props.user) {
    setValues({
      nama: props.user.nama,
      role: props.user.role,
      username: props.user.username,
    });
  }
}

onMounted(handleUserValue);
watch(() => props.user, handleUserValue);

const onSubmit = handleSubmit((values) => {
  if (values.password != values.password_confirmation) {
    setFieldError("password_confirmation", "Konfirmasi password tidak sama");
  }

  emits("save", values as any);
});
</script>

<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-5">
      <CardContent class="space-y-4">
        <FormGroup
          name="nama"
          label="Nama Karyawan"
          v-slot="{ componentField }"
        >
          <Input placeholder="Masukkan nama karyawan" v-bind="componentField" />
        </FormGroup>

        <FormGroup name="role" label="Role" v-slot="{ componentField }">
          <Listdown
            :items="userRoleOptions"
            v-bind="componentField"
            placeholder="Pilih role"
          ></Listdown>
        </FormGroup>

        <FormGroup name="username" label="Username" v-slot="{ componentField }">
          <Input
            type="username"
            v-bind="componentField"
            placeholder="Masukkan username"
          />
        </FormGroup>

        <FormGroup
          name="password"
          label="Password"
          v-slot="{ componentField }"
          :helper="
            isEdit ? 'Biarkan kosong jika tidak ingin mengganti password' : ''
          "
        >
          <PasswordInput v-bind="componentField" />
        </FormGroup>

        <FormGroup
          name="password_confirmation"
          label="Konfirmasi Password"
          v-slot="{ componentField }"
        >
          <PasswordInput v-bind="componentField" />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex items-center gap-2">
        <Button type="button" @click="router.back" variant="outline">
          Batal
        </Button>
        <Button type="submit">
          <Spinner class="size-4" v-if="loading"></Spinner>
          <Save v-else class="size-4"></Save>
          Simpan Karyawan
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
