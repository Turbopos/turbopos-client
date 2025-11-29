<script setup lang="ts">
import useGetStockReport from "~/composables/report/useGetStockReport";
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

const { data, total, perPage, payload } = useGetStockReport();

const selectedCategory = ref<number | undefined>();
const currentPage = ref(1);

watch(selectedCategory, () => {
  payload.value = {
    ...payload.value,
    category_id:
      selectedCategory.value == 0 ? undefined : selectedCategory.value,
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
  }).toString();
  window.open("/stock-report/print?" + queryString, "_blank");
}
</script>

<template>
  <div class="space-y-4">
    <Heading title="Laporan Stok Barang">
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
    </div>

    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Satuan</TableHead>
              <TableHead>Stok</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="item.nama_barang">
              <TableCell>{{ item.nama_barang }}</TableCell>
              <TableCell>{{ item.jumlah }}</TableCell>
              <TableCell>{{ item.satuan }}</TableCell>
              <TableCell>{{ item.stok }}</TableCell>
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
