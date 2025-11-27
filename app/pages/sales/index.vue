<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import {
  useGetSalesTransactions,
  useDeleteSalesTransaction,
} from "~/composables/sales-transaction";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";
import { transactionStatusOptions } from "~/utils/constants";
import Listdown from "~/components/form/Listdown.vue";

const { result, loading, error, refresh, payload } = useGetSalesTransactions();
const { execute: destroy, loading: deleteLoading } =
  useDeleteSalesTransaction();

async function handleDelete(id: number) {
  await destroy(id);
  await refresh();

  return true;
}
</script>

<template>
  <div class="space-y-5">
    <Heading
      title="Transaksi Penjualan"
      description="Mengelola data transaksi penjualan"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink class="flex items-center gap-3" to="/sales/create">
            <Plus class="size-4"></Plus>
            Tambah Penjualan
          </NuxtLink>
        </Button>
      </template>
    </Heading>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input placeholder="Cari..." v-model="payload.search" />
      <Listdown
        :items="transactionStatusOptions"
        v-model="payload.status"
        placeholder="Semua Status"
        with-all
      />
      <Input
        type="date"
        placeholder="Tanggal Dari"
        :max="payload.transaction_at_to"
        v-model="payload.transaction_at_from"
      />
      <Input
        type="date"
        placeholder="Tanggal Sampai"
        :min="payload.transaction_at_from"
        v-model="payload.transaction_at_to"
      />
    </div>

    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Tanggal Transaksi</TableHead>
              <TableHead>Item Terjual</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
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
              v-if="result?.sales_transactions.length == 0"
              class="py-20"
            >
              <NoResult
                message="Tidak ada transaksi penjualan tersedia"
              ></NoResult>
            </TableCaption>
            <TableBody>
              <TableRow v-for="st in result?.sales_transactions" :key="st.id">
                <TableCell>{{ st.kode }}</TableCell>
                <TableCell>
                  {{ st.customer?.nama ?? "-" }}
                </TableCell>
                <TableCell>{{ formatDate(st.transaction_at) }}</TableCell>
                <TableCell>{{ st.details.length }} Item</TableCell>
                <TableCell>{{ formatCurrency(st.total) }}</TableCell>
                <TableCell>
                  <Badge
                    :variant="
                      st.status === 'completed'
                        ? 'default'
                        : st.status === 'cancelled'
                          ? 'destructive'
                          : 'secondary'
                    "
                  >
                    {{
                      st.status === "completed"
                        ? "Selesai"
                        : st.status === "cancelled"
                          ? "Dibatalkan"
                          : "Pending"
                    }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal class="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem as-child>
                        <NuxtLink :to="`/sales/${st.id}`">
                          Lihat Detail
                        </NuxtLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem as-child>
                        <NuxtLink :to="`/sales/${st.id}/edit`"> Edit </NuxtLink>
                      </DropdownMenuItem>
                      <ConfirmDialog
                        title="Hapus Transaksi Penjualan"
                        description="Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan."
                        variant="destructive"
                        :loading="deleteLoading"
                        @confirm="handleDelete(st.id)"
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
