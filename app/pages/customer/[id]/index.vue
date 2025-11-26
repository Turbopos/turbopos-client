<script setup lang="ts">
import { Car, Edit } from "lucide-vue-next";
import Heading from "~/components/main/Heading.vue";
import useGetCustomer from "~/composables/customer/useGetCustomer";

const route = useRoute();
const id = route.params.id;
const { result, error, loading } = useGetCustomer(id);
</script>

<template>
  <div class="space-y-5">
    <Heading back title="Detail Customer"></Heading>
    <template v-if="!loading && result">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ result.customer.nama }}</CardTitle>
            <Button type="button" as-child size="sm">
              <NuxtLink
                :to="`/customer/${id}/edit`"
                class="flex items-center gap-3"
              >
                <Edit class="size-4"></Edit>
                Edit Customer
              </NuxtLink>
            </Button>
          </div>
        </CardHeader>
        <CardContent class="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <Label class="text-muted-foreground">Nama</Label>
            <p>{{ result.customer.nama }}</p>
          </div>
          <div>
            <Label class="text-muted-foreground">Alamat</Label>
            <p>{{ result.customer.alamat }}</p>
          </div>
          <div>
            <Label class="text-muted-foreground">Telepon</Label>
            <p>{{ result.customer.telepon }}</p>
          </div>
          <div v-if="result.customer.whatsapp">
            <Label class="text-muted-foreground">WhatsApp</Label>
            <p>{{ result.customer.whatsapp }}</p>
          </div>
          <div v-if="result.customer.keterangan">
            <Label class="text-muted-foreground">Keterangan</Label>
            <p>{{ result.customer.keterangan }}</p>
          </div>
        </CardContent>
      </Card>
      <CustomerTransportList :customer-id="Number(id)" />
    </template>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
  </div>
</template>
