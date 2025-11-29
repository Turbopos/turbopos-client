<script setup lang="ts">
import useGetSalesTransactionReport from "~/composables/report/useGetSalesTransactionReport";
import { formatCurrency } from "~/lib/currency";
import MonthYearInput from "~/components/form/MonthYearInput.vue";
import SelectCategory from "~/components/form/SelectCategory.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "~/components/ui/table";
import TablePagination from "~/components/TablePagination.vue";
import Heading from "~/components/main/Heading.vue";
import { Printer } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import NoResult from "~/components/NoResult.vue";

const { data, total, perPage, payload } = useGetSalesTransactionReport();

const selectedMonth = ref("");
const selectedCategory = ref<number | undefined>();
const currentPage = ref(1);

watch([selectedMonth, selectedCategory], () => {
  payload.value = {
    ...payload.value,
    month: selectedMonth.value || undefined,
    category_id: selectedCategory.value,
    page: 1,
  };
  currentPage.value = 1;
});

watch(currentPage, (newPage) => {
  payload.value = {
    ...payload.value,
    page: newPage,
  };
});

function print() {
  const queryString = new URLSearchParams({
    category_id: selectedCategory.value?.toString() || "",
    month: selectedMonth.value.toString() || "",
  }).toString();
  window.open("/sales-transaction-report/print?" + queryString, "_blank");
}
</script>

<template>
  <div class="space-y-4">
    <Heading title="Laporan Penjualan Barang/Jasa">
      <template #actions>
        <Button type="button" @click="print()">
          <Printer class="size-4" />
          Cetak Laporan
        </Button>
      </template>
    </Heading>

    <div class="flex gap-4">
      <div class="flex-1">
        <SelectCategory with-all v-model="selectedCategory" />
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
              <TableHead>Nama Barang/Jasa</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Sub Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.nama_barang">
              <TableCell>{{ item.nama_barang }}</TableCell>
              <TableCell>{{ item.jumlah }}</TableCell>
              <TableCell>{{ item.satuan }}</TableCell>
              <TableCell>{{ formatCurrency(item.harga_jual) }}</TableCell>
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
