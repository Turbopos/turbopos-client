<script setup lang="ts">
import moment from "moment";
import "~/assets/css/print.css";

import useGetProfitLossCategoryReport from "~/composables/report/useGetProfitLossCategoryReport";
import { formatCurrency } from "~/lib/currency";

const query = useRoute().query;

const { data } = useGetProfitLossCategoryReport({
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
      Laporan Laba Rugi per Kategori
      <div v-if="query.month">Bulan {{ moment(query.month + "-01").format("MMMM YYYY") }}</div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Kategori</th>
          <th>Total Laba Rugi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.kategori">
          <td>{{ item.kategori }}</td>
          <td>
            {{ formatCurrency(item.total_laba_rugi) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>