<script setup lang="ts">
import { ArrowLeft, Printer } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import { useGetPurchaseOrder } from "~/composables/purchase-order";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);

const { result, loading, error, refresh } = useGetPurchaseOrder(id);
</script>

<template>
  <div class="space-y-6">
    <Heading
      back
      title="Detail Transaksi Pembelian"
      :breadcrumbs="[
        {
          name: 'Transaksi Pembelian',
          to: '/purchase-order',
        },
        {
          name: 'Detail Transaksi Belanjaan',
          to: '/purchase-order',
        },
      ]"
    >
      <template #actions>
        <Button variant="outline" type="button" as-child>
          <NuxtLink
            :to="`purchase-order/${id}/print`"
            target="_blank"
            class="flex items-center gap-2"
          >
            <Printer class="size-4"></Printer>
            Cetak
          </NuxtLink>
        </Button>
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

    <!-- Purchase Order Details -->
    <div v-else-if="result?.purchase_order" class="space-y-6">
      <!-- Main Information Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>{{ result.purchase_order.kode }}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Distributor</Label
              >
              <p class="text-lg font-semibold">
                {{ result.purchase_order.distributor.nama }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >User</Label
              >
              <p class="text-lg font-semibold">
                {{ result.purchase_order.user.nama }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Tanggal Transaksi</Label
              >
              <p class="text-lg font-semibold">
                {{ formatDate(result.purchase_order.transaction_at) }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Subtotal</Label
              >
              <p class="text-lg font-semibold">
                {{ formatCurrency(result.purchase_order.subtotal) }}
              </p>
            </div>
            <div class="md:col-span-2 lg:col-span-3">
              <Label class="text-sm font-medium text-muted-foreground"
                >Total</Label
              >
              <p class="text-2xl font-bold text-primary">
                {{ formatCurrency(result.purchase_order.total) }}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div class="text-sm text-muted-foreground">
            Dibuat: {{ formatDate(result.purchase_order.created_at) }} | Diubah:
            {{ formatDate(result.purchase_order.updated_at) }}
          </div>
        </CardFooter>
      </Card>

      <!-- Items Table -->
      <Card>
        <CardHeader>
          <CardTitle>Item yang Dibeli</CardTitle>
          <CardDescription>
            Daftar produk dalam purchase order ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead class="text-right">Harga Pokok</TableHead>
                <TableHead class="text-right">Jumlah</TableHead>
                <TableHead class="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="item in result.purchase_order.details"
                :key="item.id"
              >
                <TableCell class="font-medium">
                  {{ item.product.nama }}
                </TableCell>
                <TableCell class="text-right">
                  {{ formatCurrency(item.harga_pokok) }}
                </TableCell>
                <TableCell class="text-right">{{ item.jumlah }}</TableCell>
                <TableCell class="text-right font-semibold">
                  {{ formatCurrency(item.subtotal) }}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colspan="3" class="text-right font-semibold">
                  Total
                </TableCell>
                <TableCell class="text-right font-bold text-primary">
                  {{ formatCurrency(result.purchase_order.subtotal) }}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-8">
      <p class="text-muted-foreground">Purchase order tidak ditemukan</p>
      <Button as-child variant="outline" class="mt-4">
        <NuxtLink to="/purchase-order" class="flex gap-3">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke List
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
