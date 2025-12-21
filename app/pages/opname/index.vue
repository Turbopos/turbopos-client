<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";
import DateRangeInput from "~/components/form/DateRangeInput.vue";
import useGetOpnames from "~/composables/opname/useGetOpnames";

const { result, loading, error, refresh, payload } = useGetOpnames();
</script>

<template>
  <div class="space-y-5">
    <Heading
      title="Transaksi Stok Opname"
      description="Mengelola data transaksi stok opname dari produk"
      :breadcrumbs="[
        {
          name: 'Transaksi Opname',
          to: '/opname',
        },
      ]"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink class="flex items-center gap-3" to="/opname/create">
            <Plus class="size-4"></Plus>
            Tambah Opname
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
              <TableHead>Operator</TableHead>
              <TableHead>Tanggal Transaksi</TableHead>
              <TableHead>Item Diopname</TableHead>
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
            <TableCaption v-if="result?.opnames.length == 0" class="py-20">
              <NoResult message="Tidak ada stok opname tersedia"></NoResult>
            </TableCaption>
            <TableBody>
              <TableRow v-for="opname in result?.opnames" :key="opname.id">
                <TableCell>{{ opname.kode }}</TableCell>
                <TableCell>{{ opname.user.nama }}</TableCell>
                <TableCell>{{ formatDate(opname.transaction_at) }}</TableCell>
                <TableCell>{{ opname.details.length }} Item</TableCell>
                <TableCell>{{ formatCurrency(opname.total) }}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal class="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem as-child>
                        <NuxtLink :to="`opname/${opname.id}`">
                          Lihat Detail
                        </NuxtLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem as-child>
                        <NuxtLink
                          :to="`opname/${opname.id}/print`"
                          target="_blank"
                        >
                          Cetak
                        </NuxtLink>
                      </DropdownMenuItem>
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
