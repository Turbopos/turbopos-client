<script setup lang="ts">
import useGetOpnameReport from "~/composables/report/useGetOpnameReport";
import { formatCurrency } from "~/lib/currency";
import MonthYearInput from "~/components/form/MonthYearInput.vue";
import ComboboxUser from "~/components/form/ComboboxUser.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import TablePagination from "~/components/TablePagination.vue";
import type { User } from "~/types";
import Heading from "~/components/main/Heading.vue";
import { Printer } from "lucide-vue-next";

const { data, total, perPage, payload } = useGetOpnameReport();

const selectedMonth = ref("");
const selectedUser = ref<User>();
const currentPage = ref(1);

watch([selectedMonth, selectedUser], () => {
  payload.value = {
    ...payload.value,
    month: selectedMonth.value || undefined,
    user_id: selectedUser.value?.id,
    page: 1, // reset to page 1 when filters change
  };
  currentPage.value = 1;
});

function print() {
  const queryString = new URLSearchParams({
    distributor_id: selectedUser.value?.id?.toString() || "",
    month: selectedMonth.value.toString() || "",
  }).toString();
  window.open("/opname-report/print?" + queryString, "_blank");
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
    <Heading
      title="Laporan Stok Opname"
      :breadcrumbs="[
        {
          name: 'Laporan Stok Opname',
          to: '/opname-report',
        },
      ]"
    >
      <template #actions>
        <Button type="button" @click="print()">
          <Printer class="size-4" />
          Cetak Laporan
        </Button>
      </template>
    </Heading>

    <div class="flex gap-4">
      <div class="flex-1">
        <ComboboxUser placeholder="Pilih Operator" v-model="selectedUser" />
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
              <TableHead>Jml Awal</TableHead>
              <TableHead>Jml Opname</TableHead>
              <TableHead>Selisih</TableHead>
              <TableHead>Harga Pokok</TableHead>
              <TableHead>Total Selisih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.nama_barang">
              <TableCell>{{ item.nama_barang }}</TableCell>
              <TableCell>{{ item.jumlah_awal }}</TableCell>
              <TableCell>{{ item.jumlah_opname }}</TableCell>
              <TableCell>{{ item.selisih }}</TableCell>
              <TableCell>{{ formatCurrency(item.harga_pokok) }}</TableCell>
              <TableCell>{{ formatCurrency(item.total) }}</TableCell>
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
