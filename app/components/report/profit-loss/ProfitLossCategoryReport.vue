<script setup lang="ts">
import useGetProfitLossCategoryReport from "~/composables/report/useGetProfitLossCategoryReport";
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
import { Printer } from "lucide-vue-next";
import Button from "~/components/ui/button/Button.vue";

const { data, total, perPage, payload } = useGetProfitLossCategoryReport();

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

function print() {
  const queryString = new URLSearchParams({
    month: selectedMonth.value.toString() || "",
  }).toString();
  window.open("/profit-loss-category-report/print?" + queryString, "_blank");
}
</script>

<template>
  <div class="space-y-4">
    <Card>
      <CardContent>
        <div class="flex justify-between items-center gap-3">
          <MonthYearInput v-model="selectedMonth" />
          <Button type="button" @click="print()">
            <Printer class="size-4" />
            Cetak Laporan
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kategori</TableHead>
              <TableHead>Total Laba Rugi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.kategori">
              <TableCell>{{ item.kategori }}</TableCell>
              <TableCell>{{ formatCurrency(item.total_laba_rugi) }}</TableCell>
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
