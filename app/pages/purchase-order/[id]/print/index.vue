<script lang="ts" setup>
import "~/assets/css/print.scss";
import { useGetPurchaseOrder } from "~/composables/purchase-order";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);

const { result } = useGetPurchaseOrder(id);
const element = ref();

watch(result, async () => {
  if (result.value) {
    const { $html2pdf } = useNuxtApp();

    await $html2pdf
      .set({
        filename: `${result.value?.purchase_order.kode}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      })
      .from(element.value)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const blob = pdf.output("bloburl");
        window.location.href = blob;
      });
  }
});

definePageMeta({
  layout: "plain",
});
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 10px;
  padding-bottom: 20px;
}
</style>

<template>
  <div class="print-element a4" ref="element">
    <div class="title">Nota Pembelian Barang</div>

    <div class="grid">
      <div>
        <table class="no-border">
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td>:</td>
              <td>{{ result?.purchase_order.kode }}</td>
            </tr>
            <tr>
              <td>Distributor</td>
              <td>:</td>
              <td>{{ result?.purchase_order.distributor?.nama }}</td>
            </tr>
            <tr>
              <td>Petugas</td>
              <td>:</td>
              <td>{{ result?.purchase_order.user?.nama }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
      <div>
        <table class="no-border">
          <tbody>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td>{{ formatDate(result?.purchase_order.transaction_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Harga Pokok</th>
          <th>Jml</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result?.purchase_order.details" :key="item.id">
          <td>{{ item.product.nama }}</td>
          <td align="right">{{ formatCurrency(item.harga_pokok) }}</td>
          <td align="right">{{ item.jumlah }}</td>
          <td align="right">{{ formatCurrency(item.subtotal) }}</td>
        </tr>
        <tr>
          <td style="text-align: center" colspan="3">TOTAL</td>
          <td align="right">
            {{ formatCurrency(result?.purchase_order.subtotal) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
