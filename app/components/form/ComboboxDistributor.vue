<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useGetDistributors from "~/composables/distributor/useGetDistributors";
import type { Distributor } from "~/types";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue?: Distributor;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: Distributor];
}>();

const { result, loading } = useGetDistributors({ limit: 500 });

const open = ref(false);
const value = useVModel(props, "modelValue", emits);

function handleSelect(val: Distributor) {
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
        {{ value?.nama || "Pilih distributor" }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command class="w-full">
        <div class="relative">
          <CommandInput class="h-9 w-full" placeholder="Cari distributor..." />
        </div>
        <CommandList>
          <CommandEmpty v-if="loading">Memuat...</CommandEmpty>
          <template v-else>
            <CommandEmpty>Tidak ada distributor ditemukan.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="distributor in result?.distributors"
                :key="distributor.id"
                :value="distributor"
                @select="() => handleSelect(distributor)"
              >
                {{ distributor.nama }}
                <CheckIcon
                  :class="
                    cn(
                      'ml-auto',
                      value?.id == distributor.id ? 'opacity-100' : 'opacity-0',
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
