<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useGetCustomers from "~/composables/customer/useGetCustomers";
import type { Customer } from "~/types";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: Customer;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: Customer];
}>();

const { result, loading } = useGetCustomers({ limit: 500 });

const open = ref(false);
const value = useVModel(props, "modelValue", emits);

function handleSelect(val: Customer) {
  value.value = val.id == value.value?.id ? undefined : val;
  open.value = false;
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ value?.nama || "Pilih Customer" }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command class="w-full">
        <div class="relative">
          <CommandInput class="h-9 w-full" placeholder="Cari customer..." />
        </div>
        <CommandList>
          <CommandEmpty v-if="loading">Memuat...</CommandEmpty>
          <template v-else>
            <CommandEmpty>Tidak ada customer ditemukan.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="customer in result?.customers"
                :key="customer.id"
                :value="customer"
                @select="() => handleSelect(customer)"
              >
                {{ customer.nama }}
                <CheckIcon
                  :class="
                    cn(
                      'ml-auto',
                      value?.id == customer.id ? 'opacity-100' : 'opacity-0',
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
