<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useForm } from "vee-validate";
import { cn } from "@/lib/utils";
import { object, string } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import useLogin from "~/composables/auth/useLogin";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const showPassword = ref(false);

const validationSchema = toTypedSchema(
  object({
    email: string().min(1, "Email harus diisi"),
    password: string().min(1, "Password harus diisi"),
  }),
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { execute, result, error, loading } = useLogin();

const onSubmit = handleSubmit(async (values) => {
  await execute(values);

  if (!error.value) {
    useCookie("token").value = result.value!.token;
    navigateTo("/dashboard");
  }
});
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <form @submit.prevent="onSubmit">
      <FieldGroup>
        <div class="flex flex-col items-start gap-3">
          <div>
            <h1 class="text-xl font-bold">Selamat datang</h1>
            <FieldDescription>
              Silahkan masuk ke akun anda untuk memulai sesi!
            </FieldDescription>
          </div>
        </div>
        <div class="space-y-5">
          <FormGroup name="email" label="Email" v-slot="{ componentField }">
            <Input
              v-bind="componentField"
              placeholder="example@gmail.com"
            ></Input>
          </FormGroup>

          <FormGroup
            name="password"
            label="Password"
            v-slot="{ componentField }"
          >
            <div class="relative">
              <Input
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
              ></Input>
            </div>
          </FormGroup>

          <Field>
            <Button :disabled="loading" type="submit">
              <Spinner v-if="loading"></Spinner>
              Masuk
            </Button>
          </Field>
        </div>
      </FieldGroup>
    </form>
  </div>
</template>
