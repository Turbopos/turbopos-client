<script setup lang="ts">
import { Field } from "vee-validate";
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  name: string;
  label?: string;
  helper?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <Field v-bind="props" v-slot="field">
    <div class="space-y-2">
      <FieldLabel v-if="label">{{ label }}</FieldLabel>

      <slot v-bind="field"></slot>

      <FieldDescription v-if="helper" class="text-xs text-muted-foreground">
        {{ helper }}
      </FieldDescription>

      <FieldError v-if="field.errors.length > 0" class="text-xs">
        {{ field.errors.join(", ") }}
      </FieldError>
    </div>
  </Field>
</template>
