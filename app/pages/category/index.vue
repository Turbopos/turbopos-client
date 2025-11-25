<script setup lang="ts">
import { MoreHorizontal, Plus } from "lucide-vue-next";
import SaveCategoryDialog from "~/components/category/SaveCategoryDialog.vue";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";
import Heading from "~/components/main/Heading.vue";
import useDeleteCategory from "~/composables/category/useDeleteCategory";
import useGetCategories from "~/composables/category/useGetCategories";

const { result, loading, error, refresh } = useGetCategories();
const {
  execute: destroy,
  loading: deleteLoading,
  error: errorLoading,
} = useDeleteCategory();

async function handleDelete(id: number) {
  await destroy(id);
  await refresh();

  return true;
}
</script>

<template>
  <Heading title="Data Kategori" description="Mengelola data kategori">
    <template #actions>
      <SaveCategoryDialog @callback="refresh">
        <Button type="button">
          <Plus class="size-4"></Plus>
          Tambah Kategori
        </Button>
      </SaveCategoryDialog>
    </template>
  </Heading>
  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kategori</TableHead>
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
          <TableCaption v-if="result?.categories.length == 0" class="py-20">
            <NoResult message="Tidak ada kategori tersedia"></NoResult>
          </TableCaption>
          <TableBody>
            <TableRow v-for="category in result?.categories">
              <TableCell>{{ category.nama }}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal class="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <SaveCategoryDialog
                      is-edit
                      :category="category"
                      @callback="refresh"
                    >
                      <DropdownMenuItem
                        @select="(e: any) => e.preventDefault()"
                      >
                        Edit
                      </DropdownMenuItem>
                    </SaveCategoryDialog>
                    <ConfirmDialog
                      title="Hapus Kategori"
                      description="Anda yakin ingin menghapus kategori ini?"
                      variant="destructive"
                      :loading="deleteLoading"
                      @confirm="handleDelete(category.id)"
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
</template>
