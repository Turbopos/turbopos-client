<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { Check, Circle, Dot } from "lucide-vue-next";
import type { StepItem } from "~/types";

const props = defineProps<{
  steps: StepItem[];
  modelValue?: number;
  disabledNext?: boolean;
}>();

const emits = defineEmits<{
  "update:modelValue": [value: number];
}>();

const value = useVModel(props, "modelValue", emits);
</script>

<template>
  <Stepper class="flex w-full items-start gap-2" v-model="value">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full flex-col items-center justify-center"
      :step="step.step"
    >
      <StepperSeparator
        v-if="step.step !== steps[steps.length - 1]?.step"
        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />

      <StepperTrigger as-child>
        <Button
          :variant="
            state === 'completed' || state === 'active' ? 'default' : 'outline'
          "
          :disabled="!['active', 'completed'].includes(state) && disabledNext"
          size="icon"
          class="z-10 rounded-full shrink-0"
          :class="[
            state === 'active' &&
              'ring-2 ring-ring ring-offset-2 ring-offset-background',
          ]"
        >
          <Check v-if="state === 'completed'" class="size-5" />
          <Circle v-if="state === 'active'" />
          <Dot v-if="state === 'inactive'" />
        </Button>
      </StepperTrigger>

      <div class="mt-5 flex flex-col items-center text-center">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </StepperTitle>
        <StepperDescription
          v-if="step.description"
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </Stepper>
</template>
