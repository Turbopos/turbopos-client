<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import Heading from "~/components/main/Heading.vue";
import useDeleteCustomer from "~/composables/customer/useDeleteCustomer";
import useGetCustomers from "~/composables/customer/useGetCustomers";
import useAuthStore from "~/stores/useAuthStore";

const { result, loading, error, refresh, payload } = useGetCustomers();
const { execute: destroy, loading: deleteLoading } = useDeleteCustomer();
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
      title="Data Customer"
      description="Mengelola data customer"
      :breadcrumbs="[
        {
          name: 'Data Customer',
          to: '/customer',
        },
      ]"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink to="/customer/create" class="flex items-center gap-2">
            <Plus class="size-4"></Plus>
            Tambah Customer
          </NuxtLink>
        </Button>
      </template>
    </Heading>
    <Input
      placeholder="Cari Customer..."
      class="w-full"
      v-model="payload.search"
    />
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <template v-if="error">
            <TableCaption>{{ error.message }}</TableCaption>
          </template>
          <template v-if="result?.customers.length == 0">
            <TableCaption class="py-20">
              <NoResult message="Tidak ada customer"></NoResult>
            </TableCaption>
          </template>
          <TableBody>
            <TableRow v-for="customer in result?.customers" :key="customer.id">
              <TableCell>{{ customer.nama }}</TableCell>
              <TableCell>{{ customer.alamat }}</TableCell>
              <TableCell>{{ customer.telepon }}</TableCell>
              <TableCell>{{ customer.whatsapp }}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal class="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem as-child>
                      <NuxtLink :to="`/customer/${customer.id}`"
                        >Lihat Detail</NuxtLink
                      >
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      v-if="authStore.user?.role === 'admin'"
                      as-child
                    >
                      <NuxtLink :to="`/customer/${customer.id}/edit`"
                        >Edit</NuxtLink
                      >
                    </DropdownMenuItem>
                    <ConfirmDialog
                      v-if="authStore.user?.role === 'admin'"
                      title="Hapus Customer"
                      description="Anda yakin ingin menghapus customer ini?"
                      variant="destructive"
                      :loading="deleteLoading"
                      @confirm="handleDelete(customer.id)"
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
