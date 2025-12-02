<script setup lang="ts">
import { ArrowLeft, Edit, Printer } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import { useGetSalesTransaction } from "~/composables/sales-transaction";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);

const { result, loading, error, refresh } = useGetSalesTransaction(id);
</script>

<template>
  <div class="space-y-6">
    <Heading
      back
      title="Detail Transaksi Penjualan"
      :breadcrumbs="[
        {
          name: 'Transaksi Penjualan',
          to: '/sales',
        },
        {
          name: 'Detail Transaksi Penjualan',
          to: '/sales',
        },
      ]"
    >
      <template #actions>
        <div class="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" as-child>
            <NuxtLink
              :to="`/sales/${id}/print`"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Printer class="size-4"></Printer>
              Cetak
            </NuxtLink>
          </Button>
          <Button type="button" as-child>
            <NuxtLink :to="`/sales/${id}/edit`" class="flex items-center gap-2">
              <Edit class="size-4"></Edit>
              Edit
            </NuxtLink>
          </Button>
        </div>
      </template>
    </Heading>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <Spinner class="w-8 h-8" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-destructive">{{ error.message }}</p>
    </div>

    <!-- Sales Transaction Details -->
    <div v-else-if="result?.sales_transaction" class="space-y-6">
      <!-- Main Information Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>{{ result.sales_transaction.kode }}</span>
            <Badge
              :variant="
                result.sales_transaction.status === 'completed'
                  ? 'default'
                  : result.sales_transaction.status === 'cancelled'
                    ? 'destructive'
                    : 'secondary'
              "
            >
              {{
                result.sales_transaction.status === "completed"
                  ? "Selesai"
                  : result.sales_transaction.status === "cancelled"
                    ? "Dibatalkan"
                    : "Pending"
              }}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-if="result.sales_transaction.customer">
              <Label class="text-sm font-medium text-muted-foreground"
                >Customer</Label
              >
              <p class="text-lg font-semibold">
                {{ result.sales_transaction.customer?.nama }}
              </p>
            </div>
            <div v-if="result.sales_transaction.transport">
              <Label class="text-sm font-medium text-muted-foreground"
                >Kendaraan</Label
              >
              <p class="text-lg font-semibold">
                {{ result.sales_transaction.transport.nama }} -
                {{ result.sales_transaction.transport.no_polisi }}
              </p>
            </div>
            <div v-if="result.sales_transaction.mekanik">
              <Label class="text-sm font-medium text-muted-foreground"
                >Mekanik</Label
              >
              <p class="text-lg font-semibold">
                {{ result.sales_transaction.mekanik.nama }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >User</Label
              >
              <p class="text-lg font-semibold">
                {{ result.sales_transaction.user.nama }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Tanggal Transaksi</Label
              >
              <p class="text-lg font-semibold">
                {{ formatDate(result.sales_transaction.transaction_at) }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Subtotal</Label
              >
              <p class="text-lg font-semibold">
                {{ formatCurrency(result.sales_transaction.subtotal) }}
              </p>
            </div>
            <div class="md:col-span-2 lg:col-span-3">
              <Label class="text-sm font-medium text-muted-foreground"
                >Total</Label
              >
              <p class="text-2xl font-bold text-primary">
                {{ formatCurrency(result.sales_transaction.total) }}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div class="text-sm text-muted-foreground">
            Dibuat: {{ formatDate(result.sales_transaction.created_at) }} |
            Diubah:
            {{ formatDate(result.sales_transaction.updated_at) }}
          </div>
        </CardFooter>
      </Card>

      <!-- Items Table -->
      <Card>
        <CardHeader>
          <CardTitle>Item yang Dijual</CardTitle>
          <CardDescription>
            Daftar produk dalam transaksi penjualan ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead class="text-right">Harga Pokok</TableHead>
                <TableHead class="text-right">Harga Jual</TableHead>
                <TableHead class="text-right">Jumlah</TableHead>
                <TableHead class="text-right">Diskon</TableHead>
                <TableHead class="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="item in result.sales_transaction.details"
                :key="item.id"
              >
                <TableCell class="font-medium">
                  {{ item.product.nama }}
                </TableCell>
                <TableCell class="text-right">
                  {{ formatCurrency(item.harga_pokok) }}
                </TableCell>
                <TableCell class="text-right">
                  {{ formatCurrency(item.harga_jual) }}
                </TableCell>
                <TableCell class="text-right">{{ item.jumlah }}</TableCell>
                <TableCell class="text-right">{{ item.diskon }}%</TableCell>
                <TableCell class="text-right font-semibold">
                  {{ formatCurrency(item.total) }}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colspan="5" class="text-right font-semibold">
                  Total
                </TableCell>
                <TableCell class="text-right font-bold text-primary">
                  {{ formatCurrency(result.sales_transaction.subtotal) }}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-8">
      <p class="text-muted-foreground">Transaksi penjualan tidak ditemukan</p>
      <Button as-child variant="outline" class="mt-4">
        <NuxtLink to="/sales" class="flex gap-3">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke List
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
