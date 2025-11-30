<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import {
  useGetPurchaseOrders,
  useDeletePurchaseOrder,
} from "~/composables/purchase-order";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";
import DateRangeInput from "~/components/form/DateRangeInput.vue";

const { result, loading, error, refresh, payload } = useGetPurchaseOrders();
const { execute: destroy, loading: deleteLoading } = useDeletePurchaseOrder();

async function handleDelete(id: number) {
  await destroy(id);
  await refresh();

  return true;
}
</script>

<template>
  <div class="space-y-5">
    <Heading
      title="Transaksi Pembelian"
      description="Mengelola data transaksi pembelian"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink class="flex items-center gap-3" to="/purchase-order/create">
            <Plus class="size-4"></Plus>
            Tambah Belanjaan
          </NuxtLink>
        </Button>
      </template>
    </Heading>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input placeholder="Cari..." v-model="payload.search" />
      <div>
        <DateRangeInput
          v-model:start-date="payload.transaction_at_from"
          v-model:end-date="payload.transaction_at_to"
        />
      </div>
    </div>

    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Distributor</TableHead>
              <TableHead>Tanggal Transaksi</TableHead>
              <TableHead>Item Dibeli</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <template v-if="loading">
            <TableCaption>Loading...</TableCaption>
          </template>
          <template v-else>
            <TableCaption v-if="error">
              {{ error.message }}
            </TableCaption>
            <TableCaption
              v-if="result?.purchase_orders.length == 0"
              class="py-20"
            >
              <NoResult message="Tidak ada purchase order tersedia"></NoResult>
            </TableCaption>
            <TableBody>
              <TableRow v-for="po in result?.purchase_orders" :key="po.id">
                <TableCell>{{ po.kode }}</TableCell>
                <TableCell>{{ po.distributor.nama }}</TableCell>
                <TableCell>{{ formatDate(po.transaction_at) }}</TableCell>
                <TableCell>{{ po.details.length }} Item</TableCell>
                <TableCell>{{ formatCurrency(po.total) }}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal class="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem as-child>
                        <NuxtLink :to="`purchase-order/${po.id}`">
                          Lihat Detail
                        </NuxtLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem as-child>
                        <NuxtLink
                          :to="`purchase-order/${po.id}/print`"
                          target="_blank"
                        >
                          Cetak
                        </NuxtLink>
                      </DropdownMenuItem>
                      <ConfirmDialog
                        title="Hapus Transaksi Pembelian"
                        description="Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan."
                        variant="destructive"
                        :loading="deleteLoading"
                        @confirm="handleDelete(po.id)"
                      >
                        <DropdownMenuItem
                          class="text-destructive"
                          @select="(e: any) => e.preventDefault()"
                        >
                          Hapus
                        </DropdownMenuItem>
                      </ConfirmDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </template>
        </Table>
      </CardContent>
      <CardFooter>
        <TablePagination
          v-model:page="payload.page"
          :total="result?.total"
          :limit="payload.limit"
        ></TablePagination>
      </CardFooter>
    </Card>
  </div>
</template>
