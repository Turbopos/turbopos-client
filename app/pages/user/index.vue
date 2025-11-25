<script setup lang="ts">
import { MoreHorizontal, MoreVertical, Plus } from "lucide-vue-next";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import Heading from "~/components/main/Heading.vue";
import UserRoleBadge from "~/components/user/UserRoleBadge.vue";
import useDeleteUser from "~/composables/user/useDeleteUser";
import useGetUsers from "~/composables/user/useGetUsers";

const { result, loading, error, payload, refresh } = useGetUsers();
const { execute: destroy, loading: deleteLoading } = useDeleteUser();

const auth = useAuthStore();

async function handleDelete(id: number) {
  await destroy(id);
  await refresh();

  return true;
}
</script>

<template>
  <div class="space-y-5">
    <Heading
      title="Data Karyawan"
      description="Mengelola data karyawan yang mendaftar"
    >
      <template #actions>
        <Button type="button" as-child>
          <NuxtLink to="/user/create" class="flex items-center gap-2">
            <Plus class="size-4"></Plus>
            Tambah Karyawan
          </NuxtLink>
        </Button>
      </template>
    </Heading>
    <Input
      placeholder="Cari Karyawan..."
      class="w-full"
      v-model="payload.search"
    />
    <Card>
      <CardHeader>
        <CardTitle> Data Karyawan </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Karyawan</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <template v-if="loading">
            <TableCaption>Loading...</TableCaption>
          </template>
          <template v-else>
            <template v-if="error">
              <TableCaption>{{ error.message }}</TableCaption>
            </template>
            <template v-if="result?.users.length == 0">
              <TableCaption>
                <NoResult message="Tidak ada karyawan ditemukan"></NoResult>
              </TableCaption>
            </template>
            <TableBody>
              <TableRow v-for="user in result?.users">
                <TableCell>{{ user.nama }}</TableCell>
                <TableCell>{{ user.username }}</TableCell>
                <TableCell>
                  <UserRoleBadge :role="user.role"></UserRoleBadge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal class="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem as-child>
                        <NuxtLink :to="`/user/${user.id}`">Edit</NuxtLink>
                      </DropdownMenuItem>
                      <ConfirmDialog
                        v-if="user.id != auth.user?.id"
                        title="Hapus User"
                        description="Anda yakin ingin menghapus user ini?"
                        variant="destructive"
                        :loading="deleteLoading"
                        @confirm="handleDelete(user.id)"
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
    </Card>
  </div>
</template>
