<script lang="ts" setup>
import type { CreateProductRequest, Product } from "~/types";
import { Save } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string, number, union, literal } from "zod";
import { useForm } from "vee-validate";
import { productTypeOptions } from "~/utils/constants/options/product-type";
import SelectCategory from "~/components/form/SelectCategory.vue";
import ButtonGroupSelect from "../form/ButtonGroupSelect.vue";
import ComboboxDistributor from "../form/ComboboxDistributor.vue";

const props = defineProps<{
  isEdit?: boolean;
  product?: Product;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [value: CreateProductRequest];
}>();

const router = useRouter();

const validationSchema = toTypedSchema(
  object({
    jenis: union([literal("barang"), literal("jasa")]),
    distributor: object({
      id: number("Distributor harus dipilih").min(
        1,
        "Distributor harus dipilih",
      ),
      nama: string().optional(),
    }).optional(),
    category_id: number().min(1, "Kategori harus dipilih"),
    nama: string().min(1, "Nama harus diisi"),
    sn: string().optional(),
    harga_pokok: number().optional(),
    harga_jual: number().min(0, "Harga jual harus diisi"),
    stok: number().optional(),
    satuan: string().optional(),
  }).refine(
    (data) => {
      if (data.jenis === "barang") {
        return (
          data.harga_pokok != undefined &&
          data.stok != undefined &&
          data.satuan &&
          data.distributor != undefined
        );
      }
      return true;
    },
    {
      message:
        "Distributor, harga pokok, stok, dan satuan wajib diisi untuk jenis barang",
      path: ["jenis"],
    },
  ),
);

const { handleSubmit, setValues, values, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    jenis: "barang" as any,
    category_id: 0,
    nama: "",
    sn: "",
    harga_pokok: undefined,
    harga_jual: 0,
    stok: undefined,
    satuan: "",
  },
});

function handleProductValue() {
  if (props.product) {
    setValues({
      jenis: props.product.jenis,
      distributor: props.product.distributor,
      category_id: props.product.category_id,
      nama: props.product.nama,
      sn: props.product.sn,
      harga_pokok: props.product.harga_pokok,
      harga_jual: props.product.harga_jual,
      stok: props.product.stok,
      satuan: props.product.satuan || "",
    });
  }
}

onMounted(handleProductValue);
watch(() => props.product, handleProductValue);

// Watch jenis changes to reset conditional fields
watch(
  () => values.jenis,
  (newJenis) => {
    if (newJenis === "jasa") {
      setFieldValue("harga_pokok", undefined);
      setFieldValue("stok", undefined);
      setFieldValue("satuan", "");
      setFieldValue("sn", "");
    }
  },
);

const onSubmit = handleSubmit((values) => {
  (values as any).distributor_id = values.distributor?.id;
  emits("save", values as CreateProductRequest);
});
</script>

<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-5">
      <CardContent class="space-y-4">
        <FormGroup
          name="jenis"
          label="Jenis Produk"
          v-slot="{ componentField }"
          v-if="!isEdit"
        >
          <ButtonGroupSelect
            v-bind="componentField"
            :items="productTypeOptions"
          ></ButtonGroupSelect>
        </FormGroup>

        <FormGroup
          name="category_id"
          label="Kategori"
          v-slot="{ componentField }"
        >
          <SelectCategory v-bind="componentField" />
        </FormGroup>

        <FormGroup
          name="nama"
          label="Nama Barang/Jasa"
          v-slot="{ componentField }"
        >
          <Input placeholder="Masukkan nama" v-bind="componentField" />
        </FormGroup>

        <FormGroup
          name="sn"
          label="Nomor Serial/Barcode"
          v-slot="{ componentField }"
          v-if="values.jenis == 'barang'"
        >
          <Input placeholder="Masukkan SN" v-bind="componentField" />
        </FormGroup>

        <FormGroup
          v-if="values.jenis == 'barang'"
          name="distributor"
          label="Distributor"
          v-slot="{ componentField }"
        >
          <ComboboxDistributor
            :model-value="componentField.modelValue"
            @update:model-value="(val) => setFieldValue('distributor', val)"
          />
        </FormGroup>

        <FormGroup
          v-if="values.jenis === 'barang'"
          name="harga_pokok"
          label="Harga Pokok"
          v-slot="{ componentField }"
        >
          <Input
            type="number"
            placeholder="Masukkan harga pokok"
            v-bind="componentField"
          />
        </FormGroup>

        <FormGroup
          name="harga_jual"
          label="Harga Jual"
          v-slot="{ componentField }"
        >
          <Input
            type="number"
            placeholder="Masukkan harga jual"
            v-bind="componentField"
          />
        </FormGroup>

        <FormGroup
          v-if="values.jenis === 'barang'"
          name="stok"
          label="Stok"
          v-slot="{ componentField }"
        >
          <Input
            type="number"
            placeholder="Masukkan stok"
            v-bind="componentField"
          />
        </FormGroup>

        <FormGroup
          v-if="values.jenis === 'barang'"
          name="satuan"
          label="Satuan"
          v-slot="{ componentField }"
        >
          <Input
            placeholder="Masukkan satuan (pcs, kg, dll)"
            v-bind="componentField"
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
          Simpan {{ values.jenis == "barang" ? "Produk" : "Jasa" }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
