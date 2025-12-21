<script lang="ts" setup>
import "~/assets/css/print.scss";
import useGetOpname from "~/composables/opname/useGetOpname";
import { formatCurrency } from "~/lib/currency";
import { formatDate } from "~/lib/date";

const route = useRoute();
const id = Number(route.params.id);

const { result } = useGetOpname(id);
const element = ref();

watch(result, async () => {
  if (result.value) {
    const { $html2pdf } = useNuxtApp();

    await $html2pdf
      .set({
        filename: `${result.value?.opname.kode}.pdf`,
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
    <div class="title">Nota Opname Produk</div>

    <div class="grid">
      <div>
        <table class="no-border">
          <tbody>
            <tr>
              <td>ID Transaksi</td>
              <td>:</td>
              <td>{{ result?.opname.kode }}</td>
            </tr>
            <tr>
              <td>Operator</td>
              <td>:</td>
              <td>{{ result?.opname.user?.nama }}</td>
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
              <td>{{ formatDate(result?.opname.transaction_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Jml Awal</th>
          <th>Jml Opname</th>
          <th>Selisih</th>
          <th>Harga Pokok</th>
          <th>Total Selisih</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result?.opname.details" :key="item.id">
          <td>{{ item.product.nama }}</td>
          <td align="right">{{ item.jumlah_awal }}</td>
          <td align="right">{{ item.jumlah_opname }}</td>
          <td align="right">{{ item.selisih }}</td>
          <td align="right">{{ formatCurrency(item.harga_pokok) }}</td>
          <td align="right">{{ formatCurrency(item.total_selisih) }}</td>
        </tr>
        <tr>
          <td style="text-align: center" colspan="5">TOTAL</td>
          <td align="right">
            {{ formatCurrency(result?.opname.total) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
