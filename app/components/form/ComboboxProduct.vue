<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useGetProducts from "~/composables/product/useGetProducts";
import type { Product } from "~/types";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: Product;
  distributorId?: number;
  jenis?: "barang" | "jasa";
}>();

const emits = defineEmits<{
  "update:modelValue": [value: Product];
}>();

const { result, loading, refresh } = useGetProducts({
  limit: 500,
  distributor_id: props.distributorId,
  jenis: props.jenis,
});

const open = ref(false);
const value = useVModel(props, "modelValue", emits);

function handleSelect(val: Product) {
  value.value = val.id == value.value?.id ? undefined : val;
  open.value = false;
}

const filteredProducts = computed(() => {
  if (result.value?.products && props.distributorId) {
    return result.value!.products?.filter((p) => {
      return p.distributor_id == props.distributorId;
    });
  }

  return result.value!.products;
});

watch(
  () => props.distributorId,
  () => {
    refresh();
  },
);
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
        :disabled="loading"
      >
        {{ value?.nama || "Pilih produk..." }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Cari produk..." />
        <CommandList>
          <CommandEmpty v-if="!loading">Produk tidak ditemukan.</CommandEmpty>
          <CommandGroup v-if="!loading">
            <CommandItem
              v-for="product in filteredProducts"
              :key="product.id"
              :value="product.nama"
              @select="handleSelect(product)"
            >
              {{ product.nama }}
              <CheckIcon
                :class="
                  cn(
                    'ml-auto',
                    value?.id === product.id ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
