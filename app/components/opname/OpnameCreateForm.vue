<script setup lang="ts">
import { opnameCreateSteps } from "~/utils/constants";
import Steppers from "../form/Steppers.vue";
import type { CreateOpnameRequest, User, Opname } from "~/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { array, number, object, string } from "zod";
import ComboboxProduct from "../form/ComboboxProduct.vue";
import { Plus, ShoppingCart, Trash } from "lucide-vue-next";
import { formatCurrency } from "~/lib/currency";

const props = defineProps<{
  opname?: Opname;
  isEdit?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [values: CreateOpnameRequest];
}>();

const currentStep = ref(props.isEdit ? 2 : 1);

const defaultItem = {
  product: {
    id: 0,
    nama: "",
    harga_pokok: 0,
    stok: 0,
  },
  jumlah: 0,
  harga_pokok: 0,
  jumlah_awal: 0,
  jumlah_opname: 0,
};

const { values, setFieldValue, setValues, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      items: array(
        object({
          product: object({
            id: number("Produk harus dipilih").min(1, "Produk harus dipilih"),
            nama: string(),
            harga_pokok: number().optional(),
            satuan: string().optional(),
            stok: number().optional(),
          }),
          jumlah_awal: number().min(0, "Jumlah awal harus diisi"),
          harga_pokok: number().min(1, "Harga pokok harus diisi"),
          jumlah_opname: number().min(0, "Jumlah opname harus diisi"),
        }),
      ),
    }),
  ),
  initialValues: {
    items: [{ ...defaultItem }],
  },
});

const subtotal = computed(() => {
  let subtotal = 0;

  for (const item of values.items || []) {
    const selisih = item.jumlah_opname - item.jumlah_awal;
    const total_selisih = item.harga_pokok * selisih;

    subtotal += total_selisih;
  }

  return subtotal;
});

const total = computed(() => {
  return subtotal.value;
});

function addItem() {
  setValues({
    items: [...(values.items as any), { ...defaultItem }],
  });
}

function removeItem(i: number) {
  setValues({
    items: values.items?.filter((_, index) => index !== i),
  });
}

function resetItems() {
  setValues({
    items: [{ ...defaultItem }],
  });
}

function confirmOpname() {
  emits("save", {
    items:
      values.items?.map((item) => {
        return {
          product_id: item.product.id,
          harga_pokok: item.harga_pokok,
          jumlah_awal: item.jumlah_awal,
          jumlah_opname: item.jumlah_opname,
        };
      }) || [],
  });
}
</script>

<template>
  <Card>
    <CardContent>
      <Steppers
        v-model="currentStep"
        :steps="opnameCreateSteps"
        disabled-next
      ></Steppers>
    </CardContent>
  </Card>
  <Card>
    <div :class="{ hidden: currentStep != 1 }">
      <CardContent class="space-y-4">
        <div class="flex items-center justify-end">
          <Button size="sm" type="button" @click="addItem">
            <Plus class="size-4"></Plus>
            Tambah Item
          </Button>
        </div>
        <Card v-for="(item, i) in values.items">
          <CardContent>
            <div class="flex items-start justify-between gap-3">
              <div
                class="flex-1 space-y-3 grid md:grid-cols-4 grid-cols-2 gap-3"
              >
                <div class="col-span-2">
                  <FormGroup
                    :name="`items[${i}].product`"
                    v-slot="{ value, setValue }"
                    label="Produk"
                  >
                    <ComboboxProduct
                      jenis="barang"
                      :model-value="value"
                      @update:model-value="
                        (val) => {
                          setValue(val);
                          setFieldValue(
                            `items[${i}].harga_pokok`,
                            val.harga_pokok! as never,
                          );
                          setFieldValue(
                            `items[${i}].jumlah_awal`,
                            val.stok! as never,
                          );
                          setFieldValue(
                            `items[${i}].jumlah_opname`,
                            0 as never,
                          );
                        }
                      "
                    />
                  </FormGroup>
                </div>

                <FormGroup
                  :name="`items[${i}].harga_pokok`"
                  v-slot="{ componentField }"
                  label="Harga Pokok"
                >
                  <Input
                    placeholder="Harga Pokok"
                    type="number"
                    v-bind="componentField"
                    disabled
                  />
                </FormGroup>

                <div class="flex items-center gap-2">
                  <div class="flex-1 min-w-0">
                    <FormGroup
                      :name="`items[${i}].jumlah_awal`"
                      v-slot="{ componentField }"
                      label="Jml Awal"
                    >
                      <Input
                        type="number"
                        min="0"
                        v-bind="componentField"
                        placeholder="Jumlah Awal"
                        :class="{ 'rounded-r-none': item.product?.satuan }"
                      />
                    </FormGroup>
                  </div>
                  <div class="flex-1 min-w-0">
                    <FormGroup
                      :name="`items[${i}].jumlah_opname`"
                      v-slot="{ componentField }"
                      label="Jml Opname"
                    >
                      <Input
                        type="number"
                        min="0"
                        v-bind="componentField"
                        placeholder="Jumlah Opname"
                        :class="{ 'rounded-r-none': item.product?.satuan }"
                      />
                    </FormGroup>
                  </div>
                </div>

                <FormGroup :name="`items[${i}].selisih`" label="Selisih">
                  <Input
                    disabled
                    :model-value="item.jumlah_opname - item.jumlah_awal"
                  />
                </FormGroup>

                <div class="col-span-3">
                  <FormGroup
                    :name="`items[${i}].total_selisih`"
                    label="Total Selisih"
                  >
                    <Input
                      disabled
                      :model-value="
                        formatCurrency(
                          item.harga_pokok *
                            (item.jumlah_opname - item.jumlah_awal),
                        )
                      "
                    />
                  </FormGroup>
                </div>
              </div>

              <div
                class="flex justify-end"
                v-if="values.items && values.items?.length > 1"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  class="text-destructive md:mt-7"
                  @click="removeItem(i)"
                >
                  <Trash class="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter class="flex justify-end mt-4">
        <Button
          type="button"
          @click="currentStep += 1"
          :disabled="Object.keys(errors).length > 0"
        >
          Selanjutnya
        </Button>
      </CardFooter>
    </div>

    <template v-if="currentStep == 2">
      <CardContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Jml Awal</TableHead>
                  <TableHead>Jml Opname</TableHead>
                  <TableHead>Selisih</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(item, i) in values.items" :key="i">
                  <TableCell>{{ item.product?.nama }}</TableCell>
                  <TableCell>{{ formatCurrency(item.harga_pokok) }}</TableCell>
                  <TableCell>{{ item.jumlah_awal }}</TableCell>
                  <TableCell>{{ item.jumlah_opname }}</TableCell>
                  <TableCell>
                    {{ item.jumlah_opname - item.jumlah_awal }}
                  </TableCell>
                  <TableCell>
                    {{
                      formatCurrency(
                        item.harga_pokok *
                          (item.jumlah_opname - item.jumlah_awal),
                      )
                    }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent class="space-y-4">
        <FormGroup name="total" label="Total">
          <Input disabled :model-value="formatCurrency(total)" />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button type="button" @click="confirmOpname">
          <Spinner v-if="loading"></Spinner>
          <ShoppingCart class="size-4"></ShoppingCart>
          Konfirmasi Opname
        </Button>
      </CardFooter>
    </template>
  </Card>
</template>
