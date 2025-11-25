<script lang="ts" setup>
import type { CreateCustomerRequest, Customer } from "~/types/customer";
import { Save } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";
import { useForm } from "vee-validate";

const props = defineProps<{
  isEdit?: boolean;
  customer?: Customer;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [value: CreateCustomerRequest];
}>();

const router = useRouter();

const validationSchema = toTypedSchema(
  object({
    nama: string().min(1, "Nama harus diisi"),
    alamat: string().min(1, "Alamat harus diisi"),
    telepon: string().min(1, "Telepon harus diisi"),
    whatsapp: string().optional(),
    keterangan: string().optional(),
  }),
);

const { handleSubmit, setValues, setFieldValue, values } = useForm({
  validationSchema,
  initialValues: {
    nama: "",
    alamat: "",
    telepon: "",
    whatsapp: "",
    keterangan: "",
  },
});

const isSameAsPhone = ref(false);

function handleCustomerValue() {
  if (props.customer) {
    setValues({
      nama: props.customer.nama,
      alamat: props.customer.alamat,
      telepon: props.customer.telepon,
      whatsapp: props.customer.whatsapp || "",
      keterangan: props.customer.keterangan || "",
    });
    // Check if whatsapp is same as telepon
    isSameAsPhone.value = props.customer.whatsapp === props.customer.telepon;
  }
}

onMounted(handleCustomerValue);
watch(() => props.customer, handleCustomerValue);

// Watch for telepon changes to auto-fill whatsapp if switch is on
watch(
  () => values.telepon,
  (newPhone) => {
    if (isSameAsPhone.value && newPhone) {
      setFieldValue("whatsapp", newPhone);
    }
  },
);

// Watch for switch changes
watch(isSameAsPhone, (newValue) => {
  if (newValue && values.telepon) {
    setFieldValue("whatsapp", values.telepon);
  } else if (!newValue && values.whatsapp === values.telepon) {
    setFieldValue("whatsapp", "");
  }
});

const onSubmit = handleSubmit((values) => {
  emits("save", values as CreateCustomerRequest);
});
</script>

<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-5">
      <CardContent class="space-y-4">
        <FormGroup
          name="nama"
          label="Nama Customer"
          v-slot="{ componentField }"
        >
          <Input placeholder="Masukkan nama customer" v-bind="componentField" />
        </FormGroup>

        <FormGroup name="alamat" label="Alamat" v-slot="{ componentField }">
          <Input placeholder="Masukkan alamat" v-bind="componentField" />
        </FormGroup>

        <FormGroup name="telepon" label="Telepon" v-slot="{ componentField }">
          <Input placeholder="Masukkan telepon" v-bind="componentField" />
        </FormGroup>

        <FormGroup name="whatsapp" label="WhatsApp" v-slot="{ componentField }">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Switch id="same-as-phone" v-model="isSameAsPhone" />
              <Label for="same-as-phone" class="text-sm"
                >Sama dengan nomor telepon</Label
              >
            </div>
            <Input
              placeholder="Masukkan WhatsApp"
              v-bind="componentField"
              :disabled="isSameAsPhone"
            />
          </div>
        </FormGroup>

        <FormGroup
          name="keterangan"
          label="Keterangan"
          v-slot="{ componentField }"
        >
          <Input placeholder="Masukkan keterangan" v-bind="componentField" />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex items-center gap-2">
        <Button type="button" @click="router.back" variant="outline">
          Batal
        </Button>
        <Button type="submit">
          <Spinner class="size-4" v-if="loading"></Spinner>
          <Save v-else class="size-4"></Save>
          Simpan Customer
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
