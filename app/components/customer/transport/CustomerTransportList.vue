<script setup lang="ts">
import { Car, MoreVertical } from "lucide-vue-next";
import {
  useGetCustomerTransports,
  useDeleteCustomerTransport,
} from "~/composables/customer-transport";
import SaveCustomerTransportDialog from "./SaveCustomerTransportDialog.vue";
import ConfirmDialog from "~/components/dialog/ConfirmDialog.vue";

const props = defineProps<{
  customerId: number;
}>();

const { result, error, loading, refresh, payload } = useGetCustomerTransports({
  customerId: props.customerId,
});

const {
  execute: destroy,
  error: deleteError,
  loading: deleteLoading,
} = useDeleteCustomerTransport();

const deleteTransport = async (id: number) => {
  try {
    await destroy(id);
    refresh();
  } catch (error) {
    console.error("Failed to delete transport:", error);
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle>Kendaraan Customer</CardTitle>
        <SaveCustomerTransportDialog
          @callback="() => refresh()"
          :customer-id="customerId"
        >
          <Button type="button" size="sm">
            <Car class="size-"></Car>
            Tambah Kendaraan
          </Button>
        </SaveCustomerTransportDialog>
      </div>
    </CardHeader>
    <CardContent>
      <Input placeholder="Cari kendaraan..." v-model="payload.search"> </Input>
    </CardContent>
    <CardContent>
      <template v-if="loading">
        <div class="text-center py-4">Loading...</div>
      </template>
      <template v-else>
        <NoResult
          v-if="result?.transports?.length == 0"
          class="py-20"
          message="Belum ada kendaraan ditambahkan"
        ></NoResult>

        <div
          class="border p-3 rounded-lg"
          v-for="transport in result?.transports"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="text-base font-medium">{{ transport.nama }}</div>
              <div class="text-sm text-muted-foreground">
                {{ transport.merk }} ({{ transport.no_polisi }})
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button type="button" variant="ghost" size="icon-sm">
                  <MoreVertical class="size-4"></MoreVertical>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <SaveCustomerTransportDialog
                  @callback="() => refresh()"
                  :customer-id="customerId"
                  is-edit
                  :transport="transport"
                >
                  <DropdownMenuItem @select="(e: any) => e.preventDefault()">
                    Edit
                  </DropdownMenuItem>
                </SaveCustomerTransportDialog>
                <ConfirmDialog
                  @confirm="deleteTransport(transport.id)"
                  title="Hapus Kendaraan"
                  description="Apakah Anda yakin ingin menghapus kendaraan ini? Tindakan ini tidak dapat dibatalkan."
                  :loading="deleteLoading"
                  variant="destructive"
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
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
