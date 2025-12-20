<script setup lang="ts">
import { Role, salesTransactionCreateSteps } from "~/utils/constants";
import Steppers from "../form/Steppers.vue";
import ComboboxCustomer from "../form/ComboboxCustomer.vue";
import ComboboxCustomerTransport from "../form/ComboboxCustomerTransport.vue";
import type {
  CreateSalesTransactionRequest,
  UpdateSalesTransactionRequest,
  Customer,
  CustomerTransport,
  SalesTransaction,
  User,
} from "~/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { array, number, object, string } from "zod";
import ComboboxProduct from "../form/ComboboxProduct.vue";
import { Plus, ShoppingCart, Trash } from "lucide-vue-next";
import { calculateSubtotal, formatCurrency } from "~/lib/currency";
import ComboboxUser from "../form/ComboboxUser.vue";

const props = defineProps<{
  salesTransaction?: SalesTransaction;
  isEdit?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{
  save: [values: CreateSalesTransactionRequest | UpdateSalesTransactionRequest];
}>();

const currentStep = ref(1);
const customer = ref<Customer>();
const customerTransport = ref<CustomerTransport>();
const mekanik = ref<User>();
const diskon = ref(0);
const ppn = ref(0);
const tunai = ref(0);

// Initialize values for edit mode
if (props.isEdit && props.salesTransaction) {
  customer.value = props.salesTransaction.customer as any;
  customerTransport.value = props.salesTransaction.transport as any;
  mekanik.value = props.salesTransaction.mekanik as any;
  diskon.value = props.salesTransaction.diskon;
  ppn.value = props.salesTransaction.ppn;
  tunai.value = props.salesTransaction.tunai;
}

const defaultItem = {
  product: {
    id: 0,
    nama: "",
    harga_jual: 0,
  },
  jumlah: 1,
  harga_jual: 0,
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
            harga_jual: number().optional(),
            satuan: string().optional(),
          }),
          jumlah: number().min(1, "Jumlah harus diisi"),
          ppn: number().optional(),
          diskon: number().optional(),
        }),
      ),
    }),
  ),
  initialValues:
    props.isEdit && props.salesTransaction
      ? {
          items: props.salesTransaction.details.map((detail) => ({
            product: {
              id: detail.product_id,
              nama: detail.product.nama,
              harga_jual: detail.harga_jual,
              satuan: detail.product.satuan,
            },
            jumlah: detail.jumlah,
            ppn: detail.ppn,
            diskon: detail.diskon,
          })),
        }
      : {
          items: [{ ...defaultItem }],
        },
});

const subtotal = computed(() => {
  let subtotal = 0;

  for (const item of values.items || []) {
    const harga = item.product.harga_jual! * item.jumlah;
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

const kembalian = computed(() => {
  return tunai.value - total.value;
});

const hasJasa = computed(() => {
  const jasa = values.items?.filter((item: any) => item.jenis == "jasa") || [];
  return jasa.length > 0 && subtotal.value > 0;
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

function confirmSalesTransaction() {
  if (props.isEdit) {
    // For edit mode, only send updatable fields
    emits("save", {
      diskon: diskon.value,
      ppn: ppn.value,
      mekanik_id: mekanik.value?.id,
      items:
        values.items?.map((item) => {
          return {
            product_id: item.product.id,
            jumlah: item.jumlah,
            ppn: item.ppn,
            diskon: item.diskon,
          };
        }) || [],
      tunai: tunai.value,
    } as UpdateSalesTransactionRequest);
  } else {
    // For create mode, include all fields
    emits("save", {
      diskon: diskon.value,
      ppn: ppn.value,
      customer_id: customer.value?.id,
      transport_id: customerTransport.value?.id,
      mekanik_id: mekanik.value?.id,
      items:
        values.items?.map((item) => {
          return {
            product_id: item.product.id,
            jumlah: item.jumlah,
            ppn: item.ppn,
            diskon: item.diskon,
          };
        }) || [],
      tunai: tunai.value,
    } as CreateSalesTransactionRequest);
  }
}
</script>

<template>
  <div class="space-y-4">
    <Card>
      <CardContent>
        <Steppers
          v-model="currentStep"
          :steps="salesTransactionCreateSteps"
          disabled-next
        ></Steppers>
      </CardContent>
    </Card>
    <Card>
      <div :class="{ hidden: currentStep != 1 }" class="space-y-4">
        <CardContent v-if="!isEdit" class="space-y-3">
          <Card>
            <CardContent class="space-y-3">
              <FormGroup name="customer" label="Customer (Optional)">
                <ComboboxCustomer v-model="customer" />
              </FormGroup>
              <FormGroup
                v-if="customer"
                name="customerTransport"
                label="Pilih Kendaraan (Optional)"
              >
                <ComboboxCustomerTransport
                  v-model="customerTransport"
                  :customer-id="customer?.id"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </CardContent>

        <!-- Show customer and transport info in edit mode -->
        <CardContent v-else class="space-y-3">
          <Card v-if="customer?.nama">
            <CardContent class="space-y-3">
              <div>
                <Label class="text-sm font-medium text-muted-foreground"
                  >Customer Pembeli</Label
                >
                <p class="text-lg font-semibold">{{ customer?.nama }}</p>
              </div>
              <div v-if="customerTransport">
                <Label class="text-sm font-medium text-muted-foreground"
                  >Kendaraan</Label
                >
                <p class="text-lg font-semibold">
                  {{ customerTransport.nama }} -
                  {{ customerTransport.no_polisi }}
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardContent class="space-y-3">
          <div class="flex items-center justify-end">
            <Button size="sm" type="button" @click="addItem">
              <Plus class="size-4"></Plus>
              Tambah Item
            </Button>
          </div>
          <Card v-for="(item, i) in values.items" :key="i">
            <CardContent>
              <div class="flex items-start justify-between gap-3">
                <div
                  class="flex-1 space-y-3 grid md:grid-cols-6 grid-cols-2 gap-3"
                >
                  <div class="col-span-2">
                    <FormGroup
                      :name="`items[${i}].product`"
                      v-slot="{ value, setValue }"
                      label="Produk"
                    >
                      <ComboboxProduct
                        :model-value="value"
                        @update:model-value="
                          (val) => {
                            setValue(val);
                            setFieldValue(
                              `items[${i}].harga_jual` as never,
                              val.harga_jual! as never,
                            );
                          }
                        "
                      />
                    </FormGroup>
                  </div>

                  <FormGroup
                    :name="`items[${i}].harga_jual`"
                    v-slot="{ componentField }"
                    label="Harga Jual"
                  >
                    <Input
                      placeholder="Harga Jual"
                      type="number"
                      v-bind="componentField"
                      disabled
                    />
                  </FormGroup>
                  <FormGroup
                    :name="`items[${i}].jumlah`"
                    v-slot="{ componentField }"
                    label="Jumlah"
                  >
                    <div class="flex items-stretch">
                      <Input
                        type="number"
                        min="0"
                        v-bind="componentField"
                        placeholder="Jumlah"
                        :class="{ 'rounded-r-none': item.product?.satuan }"
                      />
                      <div
                        v-if="item.product?.satuan"
                        class="bg-muted/10 border border-border border-l-0 px-2 text-sm rounded-r-lg flex items-center justify-center"
                      >
                        {{ item.product?.satuan }}
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup
                    :name="`items[${i}].diskon`"
                    v-slot="{ componentField }"
                    label="Diskon"
                  >
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      v-bind="componentField"
                      placeholder="Diskon"
                    />
                  </FormGroup>

                  <FormGroup :name="`items[${i}].subtotal`" label="Subtotal">
                    <Input
                      disabled
                      :model-value="
                        formatCurrency(
                          calculateSubtotal({
                            price: item.product?.harga_jual || 0,
                            qty: item.jumlah,
                            discount: item.diskon,
                          }),
                        )
                      "
                    />
                  </FormGroup>
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
        <CardFooter class="flex justify-end">
          <Button
            type="button"
            :disabled="Object.keys(errors).length > 0"
            @click="currentStep += 1"
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
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Diskon</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="(item, i) in values.items" :key="i">
                    <TableCell>{{ item.product?.nama }}</TableCell>
                    <TableCell>{{
                      formatCurrency(item.product?.harga_jual || 0)
                    }}</TableCell>
                    <TableCell>{{ item.jumlah }}</TableCell>
                    <TableCell>{{ item.diskon }}%</TableCell>
                    <TableCell>{{
                      formatCurrency(
                        calculateSubtotal({
                          price: item.product?.harga_jual || 0,
                          qty: item.jumlah,
                          discount: item.diskon || 0,
                        }),
                      )
                    }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
        <CardContent class="space-y-4">
          <!-- <FormGroup name="ppn" label="PPN"> -->
          <!--   <div class="relative"> -->
          <!--     <Input -->
          <!--       v-model="ppn" -->
          <!--       class="pr-10" -->
          <!--       type="number" -->
          <!--       min="0" -->
          <!--       max="100" -->
          <!--     /> -->
          <!---->
          <!--     <div -->
          <!--       class="absolute flex items-center justify-center top-0 bottom-0 right-0 p-3" -->
          <!--     > -->
          <!--       % -->
          <!--     </div> -->
          <!--   </div> -->
          <!-- </FormGroup> -->
          <!---->
          <!-- <FormGroup name="diskon" label="Diskon"> -->
          <!--   <div class="relative"> -->
          <!--     <Input -->
          <!--       v-model="diskon" -->
          <!--       class="pr-10" -->
          <!--       type="number" -->
          <!--       min="0" -->
          <!--       max="100" -->
          <!--     /> -->
          <!---->
          <!--     <div -->
          <!--       class="absolute flex items-center justify-center top-0 bottom-0 right-0 p-3" -->
          <!--     > -->
          <!--       % -->
          <!--     </div> -->
          <!--   </div> -->
          <!-- </FormGroup> -->

          <FormGroup name="mekanik" label="Pilih Mekanik">
            <ComboboxUser
              v-model="mekanik"
              placeholder="Pilih Mekanik"
              :role="Role.Mekanik"
            />
          </FormGroup>

          <FormGroup name="total" label="Total">
            <Input disabled :model-value="formatCurrency(total)" />
          </FormGroup>

          <FormGroup name="tunai" label="Tunai">
            <Input v-model="tunai" type="number" />
          </FormGroup>

          <FormGroup name="kembalian" label="Kembalian">
            <Input disabled :model-value="formatCurrency(kembalian)" />
          </FormGroup>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button type="button" @click="confirmSalesTransaction">
            <Spinner v-if="loading"></Spinner>
            <ShoppingCart class="size-4"></ShoppingCart>
            Konfirmasi Penjualan
          </Button>
        </CardFooter>
      </template>
    </Card>
  </div>
</template>
