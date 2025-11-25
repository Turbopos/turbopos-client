<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useGetDistributor from "~/composables/distributor/useGetDistributor";

const route = useRoute();
const id = route.params.id;
const { result, error, loading } = useGetDistributor(id);
</script>

<template>
  <div class="space-y-5">
    <Heading back title="Detail Distributor"></Heading>
    <Card v-if="!loading && result">
      <CardHeader>
        <CardTitle>{{ result.distributor.nama }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Label>Alamat</Label>
          <p>{{ result.distributor.alamat }}</p>
        </div>
        <div>
          <Label>Telepon</Label>
          <p>{{ result.distributor.telepon }}</p>
        </div>
        <div v-if="result.distributor.whatsapp">
          <Label>WhatsApp</Label>
          <p>{{ result.distributor.whatsapp }}</p>
        </div>
        <div>
          <Label>Products</Label>
          <p v-if="!result.distributor.products || result.distributor.products.length === 0">Tidak ada produk</p>
          <ul v-else>
            <li v-for="product in result.distributor.products" :key="product.id">{{ product.nama }}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
  </div>
</template>