<script setup lang="ts">
import Heading from "~/components/main/Heading.vue";
import useGetProduct from "~/composables/product/useGetProduct";

const route = useRoute();
const id = route.params.id;
const { result, error, loading } = useGetProduct(Number(id));
</script>

<template>
  <div class="space-y-5">
    <Heading back title="Detail Product"></Heading>
    <Card v-if="!loading && result">
      <CardHeader>
        <CardTitle>{{ result.product.nama }}</CardTitle>
        <CardDescription>Kode: {{ result.product.kode }}</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <Label>Jenis</Label>
          <p>
            <Badge :variant="result.product.jenis === 'barang' ? 'default' : 'secondary'">
              {{ result.product.jenis === 'barang' ? 'Barang' : 'Jasa' }}
            </Badge>
          </p>
        </div>
        <div>
          <Label>Kategori ID</Label>
          <p>{{ result.product.category_id }}</p>
        </div>
        <div v-if="result.product.jenis === 'barang' && result.product.harga_pokok">
          <Label>Harga Pokok</Label>
          <p>Rp {{ result.product.harga_pokok.toLocaleString() }}</p>
        </div>
        <div>
          <Label>Harga Jual</Label>
          <p>Rp {{ result.product.harga_jual.toLocaleString() }}</p>
        </div>
        <div v-if="result.product.jenis === 'barang'">
          <Label>Stok</Label>
          <p>{{ result.product.stok }} {{ result.product.satuan }}</p>
        </div>
        <div>
          <Label>Dibuat</Label>
          <p>{{ new Date(result.product.created_at).toLocaleDateString() }}</p>
        </div>
        <div>
          <Label>Diubah</Label>
          <p>{{ new Date(result.product.updated_at).toLocaleDateString() }}</p>
        </div>
      </CardContent>
    </Card>
    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
  </div>
</template>