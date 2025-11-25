<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useGetCustomer from "~/composables/customer/useGetCustomer";

const route = useRoute();
const id = route.params.id;
const { result, error, loading } = useGetCustomer(id);
</script>

<template>
  <div class="space-y-5">
    <Heading back title="Detail Customer"></Heading>
    <Card v-if="!loading && result">
      <CardHeader>
        <CardTitle>{{ result.customer.nama }}</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Label>Alamat</Label>
          <p>{{ result.customer.alamat }}</p>
        </div>
        <div>
          <Label>Telepon</Label>
          <p>{{ result.customer.telepon }}</p>
        </div>
        <div v-if="result.customer.whatsapp">
          <Label>WhatsApp</Label>
          <p>{{ result.customer.whatsapp }}</p>
        </div>
        <div v-if="result.customer.keterangan">
          <Label>Keterangan</Label>
          <p>{{ result.customer.keterangan }}</p>
        </div>
        <div>
          <Label>Transports</Label>
          <p v-if="!result.customer.transports || result.customer.transports.length === 0">Tidak ada transport</p>
          <ul v-else>
            <li v-for="transport in result.customer.transports" :key="transport.id">{{ transport.nama }}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
  </div>
</template>