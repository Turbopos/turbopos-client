<script setup lang="ts">
import moment from "moment";
import "~/assets/css/print.css";

import useGetPurchaseOrderReport from "~/composables/report/useGetPurchaseOrderReport";
import { formatCurrency } from "~/lib/currency";

const query = useRoute().query;

const { data } = useGetPurchaseOrderReport({
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
  <div class="a4" ref="element">
    <div class="title">
      Laporan Pembelian Barang
      <div>Bulan {{ moment(query.month + "-01").format("MMMM YYYY") }}</div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Satuan</th>
          <th>Harga Pokok</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.nama_barang">
          <td>{{ item.nama_barang }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ item.satuan }}</td>
          <td>
            {{ formatCurrency(item.harga_pokok) }}
          </td>
          <td>
            {{ formatCurrency(item.sub_total) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
