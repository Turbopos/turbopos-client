<script lang="ts" setup>
import { useUpdateSalesTransactionStatus } from "~/composables/sales-transaction";
import type { SalesTransaction, SalesTransactionStatus } from "~/types";
import Listdown from "../form/Listdown.vue";
import { transactionStatusOptions } from "~/utils/constants";

const props = defineProps<{
  sales: SalesTransaction;
}>();

const emits = defineEmits<{
  update: [sales: SalesTransaction];
}>();

const selectedStatus = ref<SalesTransactionStatus>(props.sales.status);
const show = ref(false);

const { execute, loading, error } = useUpdateSalesTransactionStatus(
  props.sales.id,
);

async function updateStatus() {
  await execute({
    status: selectedStatus.value as any,
  });

  if (!error.value) {
    const sales = { ...props.sales };
    sales.status = selectedStatus.value;

    show.value = false;

    emits("update", props.sales);
  }
}
</script>

<template>
  <Dialog v-model:open="show">
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Update Status Transaksi </DialogTitle>
      </DialogHeader>

      <Listdown
        :items="transactionStatusOptions.filter((s) => s.value != 'pending')"
        v-model="selectedStatus"
      ></Listdown>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" type="button">Batal</Button>
        </DialogClose>

        <Button type="button" @click="updateStatus" :disabled="loading">
          <Spinner v-if="loading"></Spinner>
          Konfirmasi
        </Button>
      </DialogFooter>

      <div class="text-sm mt-2 text-destructive" v-if="error">
        {{ error.message }}
      </div>
    </DialogContent>
  </Dialog>
</template>
