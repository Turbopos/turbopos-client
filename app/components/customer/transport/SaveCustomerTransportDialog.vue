<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { object, string } from "zod";
import Listdown from "~/components/form/Listdown.vue";
import NoPolisiInput from "~/components/form/NoPolisiInput.vue";
import {
  useCreateCustomerTransport,
  useUpdateCustomerTransport,
} from "~/composables/customer-transport";
import type { CustomerTransport } from "~/types";
import { transportTypeOptions } from "~/utils/constants";

const props = defineProps<{
  isEdit?: boolean;
  transport?: CustomerTransport;
  customerId?: number;
}>();

const emits = defineEmits<{
  callback: [];
}>();

const show = ref(false);

const {
  loading: createLoading,
  execute: create,
  error: createError,
} = useCreateCustomerTransport();
const {
  loading: updateLoading,
  execute: update,
  error: updateError,
} = useUpdateCustomerTransport();

const loading = computed(() => createLoading.value || updateLoading.value);
const error = computed(() => createError.value || updateError.value);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(
    object({
      nama: string().min(1, "Nama kendaraan harus diisi"),
      jenis_kendaraan: string().min(1, "Jenis kendaraan harus dipilih"),
      merk: string().min(1, "Merk kendaraan harus diisi"),
      no_polisi: string().min(1, "Nomor polisi kendaraan harus diisi"),
      sn: string().optional(),
    }),
  ),
  initialValues: {
    nama: "",
    jenis_kendaraan: "",
    merk: "",
    no_polisi: "",
    sn: "",
  },
});

function handleValues() {
  if (props.transport) {
    setValues({
      nama: props.transport.nama,
      jenis_kendaraan: props.transport.jenis_kendaraan,
      merk: props.transport.merk,
      no_polisi: props.transport.no_polisi,
      sn: props.transport.sn || "",
    });
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (props.isEdit) {
    await update({
      ...values,
      customer_id: props.customerId,
      id: props.transport?.id,
    });
  } else {
    await create({
      ...values,
      customer_id: props.customerId as number,
    });
  }

  show.value = false;
  emits("callback");
});

watch(() => props.transport, handleValues);

onMounted(handleValues);
</script>

<template>
  <Dialog v-model:open="show">
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle> {{ isEdit ? "Edit" : "Tambah" }} Kendaraan </DialogTitle>
      </DialogHeader>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-3">
          <FormGroup
            name="nama"
            label="Nama Kendaraan"
            v-slot="{ componentField }"
          >
            <Input v-bind="componentField" placeholder="Masukkan nama"></Input>
          </FormGroup>

          <FormGroup
            name="jenis_kendaraan"
            label="Jenis Kendaraan"
            v-slot="{ componentField }"
          >
            <Listdown
              v-bind="componentField"
              :items="transportTypeOptions"
              placeholder="Pilih jenis kendaraan"
            ></Listdown>
          </FormGroup>

          <FormGroup name="merk" label="Merk" v-slot="{ componentField }">
            <Input v-bind="componentField" placeholder="Masukkan merk"></Input>
          </FormGroup>

          <FormGroup
            name="no_polisi"
            label="Nomor Polisi"
            v-slot="{ value, setValue }"
          >
            <NoPolisiInput
              :model-value="value"
              @update:modelValue="(val) => setValue(val)"
            />
          </FormGroup>

          <FormGroup name="sn" label="SN" v-slot="{ componentField }">
            <Input v-bind="componentField" placeholder="Masukkan SN"></Input>
          </FormGroup>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline">Batal</Button>
          </DialogClose>
          <Button type="submit" :disabled="loading">
            <Spinner v-if="loading"></Spinner>
            Simpan Kendaraan
          </Button>
        </DialogFooter>

        <div v-if="error" class="text-destructive text-sm">
          {{ error.message }}
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
