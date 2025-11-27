<script setup lang="ts">
import { purchaseOrderCreateSteps } from "~/utils/constants";
import Steppers from "../form/Steppers.vue";
import ComboboxDistributor from "../form/ComboboxDistributor.vue";
import type {
  CreatePurchaseOrderRequest,
  Distributor,
  PurchaseOrder,
} from "~/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { array, number, object, string } from "zod";
import ComboboxProduct from "../form/ComboboxProduct.vue";
import { Plus, ShoppingCart, Trash } from "lucide-vue-next";
import { formatCurrency } from "~/lib/currency";

const props = defineProps<{
  purchaseOrder?: PurchaseOrder;
  isEdit?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [values: CreatePurchaseOrderRequest];
}>();

const currentStep = ref(props.isEdit ? 2 : 1);
const distributor = ref<Distributor>();
const diskon = ref(0);
const ppn = ref(0);

const defaultItem = {
  product: {
    id: 0,
    nama: "",
    harga_pokok: 0,
  },
  jumlah: 0,
  harga_pokok: 0,
};

const { values, setFieldValue, setValues, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      items: array(
        object({
          product: object({
            id: number("Barang/jasa harus dipilih").min(
              1,
              "Barang/jasa harus dipilih",
            ),
            nama: string(),
            harga_pokok: number().optional(),
          }),
          jumlah: number().min(1, "Jumlah harus diisi"),
          harga_pokok: number().min(1, "Harga pokok harus diisi"),
          ppn: number().optional(),
          diskon: number().optional(),
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
    const harga = item.harga_pokok * item.jumlah;
    const diskon = harga * ((item.diskon || 0) / 100);
    const ppn = harga * ((item.ppn || 0) / 100);

    subtotal += harga + ppn - diskon;
  }

  return subtotal;
});

const total = computed(() => {
  const ppnValue = subtotal.value * (ppn.value / 100);
  const diskonValue = subtotal.value * (diskon.value / 100);

  return subtotal.value + ppnValue - diskonValue;
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

function confirmPurchaseOrder() {
  emits("save", {
    diskon: diskon.value,
    ppn: ppn.value,
    distributor_id: distributor.value?.id as number,
    items:
      values.items?.map((item) => {
        return {
          product_id: item.product.id,
          jumlah: item.jumlah,
          harga_pokok: item.harga_pokok,
          ppn: item.ppn,
          diskon: item.diskon,
        };
      }) || [],
  });
}

watch(distributor, resetItems);
</script>

<template>
  <Card>
    <CardContent>
      <Steppers
        v-model="currentStep"
        :steps="purchaseOrderCreateSteps"
        disabled-next
      ></Steppers>
    </CardContent>
  </Card>
  <Card>
    <div :class="{ hidden: currentStep != 1 }" class="space-y-4">
      <CardContent>
        <FormGroup name="distributor" label="Pilih Distributor">
          <ComboboxDistributor v-model="distributor" />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button
          type="button"
          :disabled="!distributor"
          @click="currentStep += 1"
        >
          Selanjutnya
        </Button>
      </CardFooter>
    </div>

    <div :class="{ hidden: currentStep != 2 }">
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
              <div class="flex-1 space-y-3">
                <FormGroup
                  :name="`items[${i}].product`"
                  v-slot="{ value, setValue }"
                  label="Produk"
                >
                  <ComboboxProduct
                    :model-value="value"
                    :distributor-id="distributor?.id"
                    @update:model-value="
                      (val) => {
                        setValue(val);
                        setFieldValue(
                          `items[${i}].harga_pokok`,
                          val.harga_pokok! as never,
                        );
                      }
                    "
                  />
                </FormGroup>

                <div class="flex items-center gap-3">
                  <div class="flex-1">
                    <FormGroup
                      :name="`items[${i}].harga_pokok`"
                      v-slot="{ componentField }"
                      label="Harga Pokok"
                    >
                      <Input
                        placeholder="Harga Pokok"
                        type="number"
                        v-bind="componentField"
                      />
                    </FormGroup>
                  </div>
                  <div class="w-48">
                    <FormGroup
                      :name="`items[${i}].jumlah`"
                      v-slot="{ componentField }"
                      label="Jumlah"
                    >
                      <Input
                        type="number"
                        min="0"
                        v-bind="componentField"
                        placeholder="Jumlah"
                      />
                    </FormGroup>
                  </div>
                </div>

                <FormGroup :name="`items[${i}].subtotal`" label="Subtotal">
                  <Input
                    disabled
                    :model-value="
                      formatCurrency(item.harga_pokok * item.jumlah)
                    "
                  />
                </FormGroup>

                <div
                  class="flex justify-end"
                  v-if="values.items && values.items?.length > 1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="text-destructive"
                    @click="removeItem(i)"
                  >
                    <Trash class="size-4" />
                    Hapus Item
                  </Button>
                </div>
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

    <template v-if="currentStep == 3">
      <CardContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(item, i) in values.items" :key="i">
                  <TableCell>{{ item.product?.nama }}</TableCell>
                  <TableCell>{{ formatCurrency(item.harga_pokok) }}</TableCell>
                  <TableCell>{{ item.jumlah }}</TableCell>
                  <TableCell>{{
                    formatCurrency(item.harga_pokok * item.jumlah)
                  }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent class="space-y-4">
        <FormGroup name="subtotal" label="Subtotal">
          <Input disabled :model-value="formatCurrency(subtotal)" />
        </FormGroup>

        <FormGroup name="diskon" label="Diskon">
          <div class="relative">
            <Input
              v-model="diskon"
              class="pr-10"
              type="number"
              min="0"
              max="100"
            />

            <div
              class="absolute flex items-center justify-center top-0 bottom-0 right-0 p-3"
            >
              %
            </div>
          </div>
        </FormGroup>

        <FormGroup name="total" label="Total">
          <Input disabled :model-value="formatCurrency(total)" />
        </FormGroup>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button type="button" @click="confirmPurchaseOrder">
          <Spinner v-if="loading"></Spinner>
          <ShoppingCart class="size-4"></ShoppingCart>
          Konfirmasi Belanja
        </Button>
      </CardFooter>
    </template>
  </Card>
</template>
