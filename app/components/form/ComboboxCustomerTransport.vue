<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetCustomerTransports } from "~/composables/customer-transport";
import type { CustomerTransport } from "~/types";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: CustomerTransport;
  customerId?: number;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: CustomerTransport];
}>();

const { result, loading, refresh } = useGetCustomerTransports({
  limit: 500,
  customerId: props.customerId as number,
});

const open = ref(false);
const value = useVModel(props, "modelValue", emits);

function handleSelect(val: CustomerTransport) {
  value.value = val.id == value.value?.id ? undefined : val;
  open.value = false;
}

const filteredTransports = computed(() => {
  if (result.value?.transports && props.customerId) {
    return result.value!.transports?.filter((t) => {
      return t.customer_id == props.customerId;
    });
  }

  return result.value?.transports || [];
});

watch(
  () => props.customerId,
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
        {{ value?.nama || "Pilih kendaraan" }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Cari kendaraan..." />
        <CommandList>
          <CommandEmpty v-if="!loading"
            >Kendaraan tidak ditemukan.</CommandEmpty
          >
          <CommandGroup v-if="!loading">
            <CommandItem
              v-for="transport in filteredTransports"
              :key="transport.id"
              :value="transport.nama"
              @select="handleSelect(transport)"
            >
              {{ transport.nama }} - {{ transport.no_polisi }}
              <CheckIcon
                :class="
                  cn(
                    'ml-auto',
                    value?.id === transport.id ? 'opacity-100' : 'opacity-0',
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
