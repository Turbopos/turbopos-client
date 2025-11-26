<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import Heading from "~/components/main/Heading.vue";
import useDeleteDistributor from "~/composables/distributor/useDeleteDistributor";
import useGetDistributors from "~/composables/distributor/useGetDistributors";
import useAuthStore from "~/stores/useAuthStore";

const { result, loading, error, refresh, payload } = useGetDistributors();
const { execute: destroy, loading: deleteLoading } = useDeleteDistributor();
const authStore = useAuthStore();

async function handleDelete(id: number) {
  await destroy(id);
  refresh();
  return true;
}
</script>

<template>
  <div class="space-y-5">
    <Heading title="Data Distributor" description="Mengelola data distributor">
      <template #actions v-if="authStore.user?.is_admin">
        <Button type="button" as-child>
          <NuxtLink to="/distributor/create" class="flex items-center gap-2">
            <Plus class="size-4"></Plus>
            Tambah Distributor
          </NuxtLink>
        </Button>
      </template>
    </Heading>
    <Input
      placeholder="Cari Distributor..."
      class="w-full"
      v-model="payload.search"
    />
    <Card>
      <CardHeader>
        <CardTitle>Data Distributor</CardTitle>
      </CardHeader>
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
          <template v-if="result?.distributors.length == 0">
            <TableCaption class="py-20">
              <NoResult message="Tidak ada distributor ditemukan"></NoResult>
            </TableCaption>
          </template>
          <TableBody>
            <TableRow
              v-for="distributor in result?.distributors"
              :key="distributor.id"
            >
              <TableCell>{{ distributor.nama }}</TableCell>
              <TableCell>{{ distributor.alamat }}</TableCell>
              <TableCell>{{ distributor.telepon }}</TableCell>
              <TableCell>{{ distributor.whatsapp }}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal class="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem as-child>
                      <NuxtLink :to="`/distributor/${distributor.id}`"
                        >Lihat Detail</NuxtLink
                      >
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      v-if="authStore.user?.role === 'admin'"
                      as-child
                    >
                      <NuxtLink :to="`/distributor/${distributor.id}/edit`"
                        >Edit</NuxtLink
                      >
                    </DropdownMenuItem>
                    <ConfirmDialog
                      v-if="authStore.user?.role === 'admin'"
                      title="Hapus Distributor"
                      description="Anda yakin ingin menghapus distributor ini?"
                      variant="destructive"
                      :loading="deleteLoading"
                      @confirm="handleDelete(distributor.id)"
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
        >
        </TablePagination>
      </CardFooter>
    </Card>
  </div>
</template>
