<script lang="ts" setup>
import "~/assets/css/print.scss";
import { useGetSalesTransaction } from "~/composables/sales-transaction";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);
const element = ref();
const settingStore = useSettingStore();

const { result } = useGetSalesTransaction(id);

watch(
  () => [result.value, settingStore.setting],
  async () => {
    if (result.value && settingStore.setting) {
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
  },
);

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
    <div class="title">
      <img src="/favicon.ico" alt="" class="title-image" />
      NOTA PENJUALAN
      <div class="subtitle">
        <div>{{ settingStore.setting?.nama }}</div>
        <div>{{ settingStore.setting?.alamat }}</div>
      </div>
    </div>

    <div class="grid">
      <div>
        <table class="no-border">
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.kode }}</td>
            </tr>
            <tr v-if="result?.sales_transaction.customer">
              <td>Customer</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.customer?.nama }}</td>
            </tr>
            <tr v-if="result?.sales_transaction.transport">
              <td>Kendaraan</td>
              <td>:</td>
              <td>
                {{ result?.sales_transaction.transport?.nama }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
      <div>
        <table class="no-border">
          <tbody>
            <tr v-if="result?.sales_transaction.transport">
              <td>Kendaraan</td>
              <td>:</td>
              <td>
                {{ result?.sales_transaction.transport?.nama }} -
                {{ result?.sales_transaction.transport?.no_polisi }}
              </td>
            </tr>
            <tr v-if="result?.sales_transaction.mekanik">
              <td>Mekanik</td>
              <td>:</td>
              <td>{{ result?.sales_transaction.mekanik?.nama }}</td>
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
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Harga</th>
          <th>Jml</th>
          <th>Diskon</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result?.sales_transaction.details" :key="item.id">
          <td>{{ item.product.nama }}</td>
          <td align="right">{{ formatCurrency(item.harga_jual) }}</td>
          <td align="right">{{ item.jumlah }}</td>
          <td align="right">{{ item.diskon }}%</td>
          <td align="right">{{ formatCurrency(item.total) }}</td>
        </tr>
        <tr>
          <td style="text-align: right" colspan="4">TOTAL</td>
          <td align="right">
            {{ formatCurrency(result?.sales_transaction.subtotal) }}
          </td>
        </tr>
        <tr>
          <td style="text-align: right" colspan="4">TUNAI</td>
          <td align="right">
            {{ formatCurrency(result?.sales_transaction.tunai) }}
          </td>
        </tr>
        <tr>
          <td style="text-align: right" colspan="4">KEMBALI</td>
          <td align="right">
            {{ formatCurrency(result?.sales_transaction.kembalian) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px; display: block">
      Operator: {{ result?.sales_transaction.user?.nama }}
    </div>
  </div>
</template>
