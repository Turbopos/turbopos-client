<script lang="ts" setup>
import "~/assets/css/print.css";
import { useGetSalesTransaction } from "~/composables/sales-transaction";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);
const element = ref();

const { result } = useGetSalesTransaction(id);

watch(result, async () => {
  if (result.value) {
    const { $html2pdf } = useNuxtApp();

    await $html2pdf
      .set({
        filename: `${result.value.sales_transaction.kode}.pdf`,
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
  <div class="a4" ref="element">
    <div class="title">
      Penjualan Barang
      <div>
        Tanggal: {{ formatDate(result?.sales_transaction.transaction_at) }}
      </div>
    </div>

    <div class="grid">
      <div>
        <table class="no-border">
          <tbody>
            <tr v-if="result?.sales_transaction.customer">
              <td>Customer</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.customer?.nama }}</td>
            </tr>
            <tr v-if="result?.sales_transaction.transport">
              <td>Kendaraan</td>
              <td>:</td>
              <td>
                {{ result?.sales_transaction.transport?.nama }} -
                {{ result?.sales_transaction.transport?.no_polisi }}
              </td>
            </tr>
            <tr>
              <td>Petugas</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.user?.nama }}</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td>
                {{ formatDate(result?.sales_transaction.transaction_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
      <div>
        <table class="no-border">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>:</td>
              <td>{{ formatCurrency(result?.sales_transaction.subtotal) }}</td>
            </tr>
            <tr>
              <td>PPN</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.ppn }}%</td>
            </tr>
            <tr>
              <td>Diskon</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.diskon }}%</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>:</td>
              <td>{{ formatCurrency(result?.sales_transaction.total) }}</td>
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
          <th>Harga Jual</th>
          <th>Kuantitas</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result?.sales_transaction.details" :key="item.id">
          <td>{{ item.product.nama }}</td>
          <td>{{ formatCurrency(item.harga_pokok) }}</td>
          <td>{{ formatCurrency(item.harga_jual) }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ formatCurrency(item.total) }}</td>
        </tr>
        <tr>
          <td style="text-align: center" colspan="4">TOTAL</td>
          <td>{{ formatCurrency(result?.sales_transaction.subtotal) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
