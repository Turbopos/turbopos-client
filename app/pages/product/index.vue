<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import Heading from "~/components/main/Heading.vue";
import useDeleteProduct from "~/composables/product/useDeleteProduct";
import useGetProducts from "~/composables/product/useGetProducts";
import useGetCategories from "~/composables/category/useGetCategories";
import useAuthStore from "~/stores/useAuthStore";
import Listdown from "~/components/form/Listdown.vue";
import { productTypeOptions } from "~/utils/constants";
import ComboboxDistributor from "~/components/form/ComboboxDistributor.vue";
import { formatCurrency } from "~/lib/currency";

const { result, loading, error, refresh, payload, distributor } =
  useGetProducts();
const { execute: destroy, loading: deleteLoading } = useDeleteProduct();
const authStore = useAuthStore();

async function handleDelete(id: number) {
  await destroy(id);
  refresh();
  return true;
}
</script>

<template>
  <div class="space-y-5">
    <Heading
      title="Data Barang/Jasa"
      description="Mengelola data produk barang dan layanan jasa yang disediakan"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink to="/product/create" class="flex items-center gap-2">
            <Plus class="size-4"></Plus>
            Tambah Produk
          </NuxtLink>
        </Button>
      </template>
    </Heading>
    <div class="flex gap-4">
      <Input placeholder="Cari..." class="flex-1" v-model="payload.search" />
      <div class="w-48">
        <ComboboxDistributor v-model="distributor" />
      </div>
      <div class="w-48">
        <Listdown
          :items="productTypeOptions"
          v-model="payload.jenis"
          placeholder="Semua Jenis"
          with-all
        ></Listdown>
      </div>
    </div>
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <template v-if="error">
            <TableCaption>{{ error.message }}</TableCaption>
          </template>
          <template v-if="result?.products.length == 0">
            <TableCaption class="py-20">
              <NoResult message="Tidak ada product"></NoResult>
            </TableCaption>
          </template>
          <TableBody>
            <TableRow v-for="product in result?.products" :key="product.id">
              <TableCell>{{ product.kode }}</TableCell>
              <TableCell>
                <Badge
                  :variant="
                    product.jenis === 'barang' ? 'default' : 'secondary'
                  "
                >
                  {{ product.jenis === "barang" ? "Barang" : "Jasa" }}
                </Badge>
              </TableCell>
              <TableCell>{{ product.nama }}</TableCell>
              <TableCell>{{ product.category?.nama }}</TableCell>
              <TableCell>{{ formatCurrency(product.harga_jual) }}</TableCell>
              <TableCell>
                <template v-if="product.jenis == 'barang'">
                  {{ product.stok }} {{ product.satuan }}
                </template>
                <template v-else>-</template>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal class="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      v-if="authStore.user?.role === 'admin'"
                      as-child
                    >
                      <NuxtLink :to="`/product/${product.id}/edit`"
                        >Edit</NuxtLink
                      >
                    </DropdownMenuItem>
                    <ConfirmDialog
                      v-if="authStore.user?.role === 'admin'"
                      title="Hapus Barang/Jasa"
                      description="Anda yakin ingin menghapus barang/jasa ini?"
                      variant="destructive"
                      :loading="deleteLoading"
                      @confirm="handleDelete(product.id)"
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
