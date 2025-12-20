<script setup lang="ts">
import moment from "moment";
import "~/assets/css/print.scss";

import useGetStockReport from "~/composables/report/useGetStockReport";
import { formatCurrency } from "~/lib/currency";

const query = useRoute().query;

const { data } = useGetStockReport({
  limit: 100000,
  ...query,
});

const element = ref();

watch(data, async () => {
  const { $html2pdf } = useNuxtApp();

  await $html2pdf
    .set({
      filename: "myfile.pdf",
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
});

const total = computed(() => {
  let t = 0;

  for (const item of data.value) {
    t += item.subtotal;
  }

  return t;
});

definePageMeta({
  layout: "plain",
});
</script>

<template>
  <div class="print-element a4" ref="element">
    <div class="title">
      Laporan Stok Barang
      <div>
        Bulan
        {{
          moment(query.month ? query.month + "-01" : new Date())
            .locale("id")
            .format("MMMM YYYY")
        }}
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Stok</th>
          <th>Satuan</th>
          <th>Harga Pokok</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.nama_barang">
          <td>{{ item.nama_barang }}</td>
          <td align="right">{{ item.jumlah }}</td>
          <td align="center">{{ item.satuan }}</td>
          <td align="right">{{ formatCurrency(item.harga_pokok) }}</td>
          <td align="right">{{ formatCurrency(item.subtotal) }}</td>
        </tr>
        <tr>
          <td colspan="4" align="right">TOTAL NILAI STOK</td>
          <td align="right">{{ formatCurrency(total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
