<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";

defineProps<{
  title: string;
  description?: string;
  back?: boolean;
}>();

const router = useRouter();
</script>

<template>
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div>
      <Button v-if="back" variant="outline" @click="router.back" class="mb-2">
        <ArrowLeft class="size-4"></ArrowLeft>
        Kembali
      </Button>
      <h1 class="text-xl font-semibold">
        {{ title }}
      </h1>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
