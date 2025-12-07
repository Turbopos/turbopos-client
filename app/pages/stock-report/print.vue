<script setup lang="ts">
import "~/assets/css/print.scss";

import useGetStockReport from "~/composables/report/useGetStockReport";

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

definePageMeta({
  layout: "plain",
});
</script>

<template>
  <div class="print-element a4" ref="element">
    <div class="title">Laporan Stok Barang</div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Satuan</th>
          <th>Stok</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.nama_barang">
          <td>{{ item.nama_barang }}</td>
          <td align="right">{{ item.jumlah }}</td>
          <td align="right">{{ item.satuan }}</td>
          <td align="right">{{ item.stok }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
