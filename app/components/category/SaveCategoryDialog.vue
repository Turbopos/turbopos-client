<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { Save } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { object, string } from "zod";
import useCreateCategory from "~/composables/category/useCreateCategory";
import useUpdateCategory from "~/composables/category/useUpdateCategory";
import type { Category } from "~/types";

const props = defineProps<{
  isEdit?: boolean;
  category?: Category;
}>();

const emits = defineEmits<{
  callback: [];
}>();

const show = ref(false);

const validationSchema = toTypedSchema(
  object({
    nama: string().min(1, "Nama kategori harus diisi"),
  }),
);

const { handleSubmit, setValues } = useForm({
  validationSchema,
  initialValues: {
    nama: "",
  },
});

function handleCategoryValue() {
  if (props.category) {
    setValues({
      nama: props.category.nama || "",
    });
  }
}

onMounted(handleCategoryValue);
watch(() => props.category, handleCategoryValue);

const {
  execute: create,
  error: createError,
  loading: createLoading,
} = useCreateCategory();
const {
  execute: update,
  error: updateError,
  loading: updateLoading,
} = useUpdateCategory();

const onSubmit = handleSubmit(async (values) => {
  if (props.isEdit) {
    await update({
      id: props.category!.id,
      nama: values.nama,
    });
  } else {
    await create({
      nama: values.nama,
    });
  }

  if (!error.value) {
    emits("callback");
    show.value = false;
  }
});

const loading = computed(() => {
  return createLoading.value || updateLoading.value;
});

const error = computed(() => {
  return createError.value || updateError.value;
});

watch(show, () => {
  setValues({
    nama: props.category?.nama || "",
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Dialog v-model:open="show">
      <DialogTrigger as-child>
        <slot></slot>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ isEdit ? "Edit" : "Tambah" }} Kategori</DialogTitle>
        </DialogHeader>

        <FormGroup
          name="nama"
          label="Nama Kategori"
          v-slot="{ componentField }"
        >
          <Input v-bind="componentField" placeholder="Masukkan nama kategori" />
        </FormGroup>

        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline">Batal</Button>
          </DialogClose>
          <Button type="submit" :disabled="loading" @click="onSubmit">
            <Spinner v-if="loading"></Spinner>
            <Save v-else class="size-4"></Save>
            Simpan
          </Button>
        </DialogFooter>

        <div class="text-sm text-destructive" v-if="error">
          {{ error.message }}
        </div>
      </DialogContent>
    </Dialog>
  </form>
</template>
