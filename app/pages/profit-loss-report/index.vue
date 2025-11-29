<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import type { OptionItem } from "~/types";
import ProfitLossItemReport from "~/components/report/profit-loss/ProfitLossItemReport.vue";
import ProfitLossCategoryReport from "~/components/report/profit-loss/ProfitLossCategoryReport.vue";

const route = useRoute();
const router = useRouter();

const tab = ref((route.query.tab as string) || "item");
const tabOptions: OptionItem[] = [
  {
    value: "item",
    label: "Per Item",
  },
  {
    value: "category",
    label: "Per Kategori",
  },
];

watch(tab, () => {
  router.replace({
    query: {
      tab: tab.value,
    },
  });
});
</script>

<template>
  <div class="space-y-4">
    <Heading title="Laporan Laba Rugi" />

    <Tabs v-model="tab">
      <TabsList class="w-full grid grid-cols-2">
        <TabsTrigger
          v-for="tab in tabOptions"
          :key="tab.value"
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="item"> <ProfitLossItemReport /> </TabsContent>
      <TabsContent value="category"> <ProfitLossCategoryReport /> </TabsContent>
    </Tabs>
  </div>
</template>
