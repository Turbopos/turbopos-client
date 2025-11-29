<script setup lang="ts">
import useGetPurchaseOrderReport from "~/composables/report/useGetPurchaseOrderReport";
import { formatCurrency } from "~/lib/currency";
import MonthYearInput from "~/components/form/MonthYearInput.vue";
import ComboboxDistributor from "~/components/form/ComboboxDistributor.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import TablePagination from "~/components/TablePagination.vue";
import type { Distributor } from "~/types";
import Heading from "~/components/main/Heading.vue";
import { Printer } from "lucide-vue-next";

const { data, total, perPage, payload } = useGetPurchaseOrderReport();

const selectedMonth = ref("");
const selectedDistributor = ref<Distributor>();
const currentPage = ref(1);

watch([selectedMonth, selectedDistributor], () => {
  payload.value = {
    ...payload.value,
    month: selectedMonth.value || undefined,
    distributor_id: selectedDistributor.value?.id,
    page: 1, // reset to page 1 when filters change
  };
  currentPage.value = 1;
});

function print() {
  const queryString = new URLSearchParams({
    distributor_id: selectedDistributor.value?.id?.toString() || "",
    month: selectedMonth.value.toString() || "",
  }).toString();
  window.open("/purchase-order-report/print?" + queryString, "_blank");
}

watch(currentPage, (newPage) => {
  payload.value = {
    ...payload.value,
    page: newPage,
  };
});
</script>

<template>
  <div class="space-y-4">
    <Heading title="Laporan Pembelian Barang">
      <template #actions>
        <Button type="button" @click="print()">
          <Printer class="size-4" />
          Cetak Laporan
        </Button>
      </template>
    </Heading>

    <div class="flex gap-4">
      <div class="flex-1">
        <ComboboxDistributor v-model="selectedDistributor" />
      </div>
      <div class="w-96">
        <MonthYearInput v-model="selectedMonth" />
      </div>
    </div>

    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Harga Pokok</TableHead>
              <TableHead>Sub Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.nama_barang">
              <TableCell>{{ item.nama_barang }}</TableCell>
              <TableCell>{{ item.jumlah }}</TableCell>
              <TableCell>{{ item.satuan }}</TableCell>
              <TableCell>{{ formatCurrency(item.harga_pokok) }}</TableCell>
              <TableCell>{{ formatCurrency(item.sub_total) }}</TableCell>
            </TableRow>
          </TableBody>
          <TableCaption v-if="data.length == 0">
            <NoResult message="Laporan belum tersedia"></NoResult>
          </TableCaption>
        </Table>
      </CardContent>
      <CardFooter>
        <TablePagination
          v-model:page="currentPage"
          :total="total"
          :limit="perPage"
        />
      </CardFooter>
    </Card>
  </div>
</template>
