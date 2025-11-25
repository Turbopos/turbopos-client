<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}>();

const show = ref(false);

const emit = defineEmits<{
  (e: "confirm"): boolean | null | undefined;
}>();

function handleClick() {
  const confirmed = emit("confirm");

  if (confirmed) {
    show.value = false;
  }
}
</script>

<template>
  <Dialog v-model:open="show">
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>

      <DialogDescription>{{ description }}</DialogDescription>

      <DialogFooter>
        <DialogClose>
          <Button type="button" variant="outline" :disabled="loading"
            >Batal</Button
          >
        </DialogClose>
        <Button
          type="button"
          :variant="variant"
          @click="handleClick"
          :disabled="loading"
        >
          <Spinner v-if="loading"></Spinner>
          Lanjutkan
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
