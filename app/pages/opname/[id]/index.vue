<script setup lang="ts">
import { ArrowLeft, Printer } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import useGetOpname from "~/composables/opname/useGetOpname";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);

const { result, loading, error, refresh } = useGetOpname(id);
</script>

<template>
  <div class="space-y-6">
    <Heading
      back
      title="Detail Transaksi Stok Opname"
      :breadcrumbs="[
        {
          name: 'Transaksi Stok Opane',
          to: '/opname',
        },
        {
          name: 'Detail Transaksi Stok Opname',
          to: '/opname',
        },
      ]"
    >
      <template #actions>
        <Button variant="outline" type="button" as-child>
          <NuxtLink
            :to="`opname/${id}/print`"
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

    <!-- Stok Opname Details -->
    <div v-else-if="result?.opname" class="space-y-6">
      <!-- Main Information Card -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>{{ result.opname.kode }}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Operator</Label
              >
              <p class="text-lg font-semibold">
                {{ result.opname.user.nama }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Tanggal Transaksi</Label
              >
              <p class="text-lg font-semibold">
                {{ formatDate(result.opname.transaction_at) }}
              </p>
            </div>
            <div>
              <Label class="text-sm font-medium text-muted-foreground"
                >Total</Label
              >
              <p class="text-lg font-semibold">
                {{ formatCurrency(result.opname.total) }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Items Table -->
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Item yang Diopname</CardTitle>
            <CardDescription>
              Daftar produk data stok opname ini
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead class="text-right">Jumlah Awal</TableHead>
                <TableHead class="text-right">Jumlah Opname</TableHead>
                <TableHead class="text-right">Selisih</TableHead>
                <TableHead class="text-right">Harga Pokok</TableHead>
                <TableHead class="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in result.opname.details" :key="item.id">
                <TableCell class="font-medium">
                  {{ item.product.nama }}
                </TableCell>
                <TableCell class="text-right">{{ item.jumlah_awal }}</TableCell>
                <TableCell class="text-right">{{
                  item.jumlah_opname
                }}</TableCell>
                <TableCell class="text-right">{{ item.selisih }}</TableCell>
                <TableCell class="text-right">
                  {{ formatCurrency(item.harga_pokok) }}
                </TableCell>
                <TableCell class="text-right font-semibold">
                  {{ formatCurrency(item.total_selisih) }}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colspan="5" class="text-right font-semibold">
                  Total
                </TableCell>
                <TableCell class="text-right font-bold text-primary">
                  {{ formatCurrency(result.opname.total) }}
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
