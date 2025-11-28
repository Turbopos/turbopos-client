<script setup lang="ts">
import useGetProfitLossItemReport from "~/composables/report/useGetProfitLossItemReport";
import { formatCurrency } from "~/lib/currency";
import MonthYearInput from "~/components/form/MonthYearInput.vue";
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
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import NoResult from "~/components/NoResult.vue";

const { data, total, perPage, payload } = useGetProfitLossItemReport();

const selectedMonth = ref("");
const currentPage = ref(1);

watch(selectedMonth, () => {
  payload.value = {
    ...payload.value,
    month: selectedMonth.value || undefined,
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
</script>

<template>
  <div class="space-y-4">
    <Card>
      <CardContent>
        <MonthYearInput v-model="selectedMonth" />
      </CardContent>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Barang/Jasa</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Harga Beli</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Laba Rugi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.nama_barang">
              <TableCell>{{ item.nama_barang }}</TableCell>
              <TableCell>{{ item.jumlah }}</TableCell>
              <TableCell>{{ item.satuan }}</TableCell>
              <TableCell>{{ formatCurrency(item.harga_beli) }}</TableCell>
              <TableCell>{{ formatCurrency(item.harga_jual) }}</TableCell>
              <TableCell>{{ formatCurrency(item.laba_rugi) }}</TableCell>
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
