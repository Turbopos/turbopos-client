<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import { useGetSalesTransactions } from "~/composables/sales-transaction";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";
import useGetDashboardSummary from "~/composables/report/useGetDashboardSummary";

const { result } = useGetSalesTransactions({ limit: 5 });
const { data: summary } = useGetDashboardSummary();

const metrics = computed(() => {
  if (!summary.value) return [];
  return [
    {
      title: "Total Penjualan Hari Ini",
      value: formatCurrency(summary.value.total_penjualan_hari_ini),
    },
    {
      title: "Jumlah Transaksi",
      value: summary.value.jumlah_transaksi_hari_ini.toString(),
    },
    {
      title: "Produk Terlaris",
      value: summary.value.produk_terlaris?.nama || "Belum tersedia",
    },
    {
      title: "Stok Rendah",
      value: `${summary.value.produk_stok_rendah} Produk`,
    },
  ];
});
</script>

<template>
  <div class="space-y-6">
    <Heading
      title="Dashboard"
      :breadcrumbs="[
        {
          name: 'Dashboard',
          to: '/dashboard',
        },
      ]"
    ></Heading>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      v-if="metrics.length > 0"
    >
      <Card v-for="metric in metrics" :key="metric.title">
        <CardHeader>
          <CardTitle>{{ metric.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold text-primary">{{ metric.value }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4">
          <Button as-child>
            <NuxtLink to="/sales/create"> Buat Transaksi Baru </NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/sales-transaction-report"> Lihat Laporan </NuxtLink>
          </Button>
          <Button variant="outline" as-child>
            <NuxtLink to="/product"> Kelola Barang & Jasa </NuxtLink>
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Recent Transactions -->
    <Card>
      <CardHeader>
        <CardTitle>Transaksi Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="transaction in result?.sales_transactions"
              :key="transaction.id"
            >
              <TableCell>{{ transaction.kode }}</TableCell>
              <TableCell>{{ transaction.customer?.nama ?? "-" }}</TableCell>
              <TableCell>{{ formatCurrency(transaction.total) }}</TableCell>
              <TableCell>{{
                formatDate(transaction.transaction_at)
              }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
