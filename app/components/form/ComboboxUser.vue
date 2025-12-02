<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from "lucide-vue-next";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { User } from "~/types";
import { useVModel } from "@vueuse/core";
import useGetUsers from "~/composables/user/useGetUsers";
import type { Role } from "~/utils/constants";

const props = defineProps<{
  modelValue?: User;
  role?: Role;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: User];
}>();

const { result, loading } = useGetUsers({ limit: 500, role: props.role });

const open = ref(false);
const value = useVModel(props, "modelValue", emits);

function handleSelect(val: User) {
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
        {{ value?.nama || "Pilih User" }}
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
                v-for="user in result?.users"
                :key="user.id"
                :value="user"
                @select="() => handleSelect(user)"
              >
                {{ user.nama }}
                <CheckIcon
                  :class="
                    cn(
                      'ml-auto',
                      value?.id == user.id ? 'opacity-100' : 'opacity-0',
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
