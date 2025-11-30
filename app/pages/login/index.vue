<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";

const appName = useRuntimeConfig().public.APP_NAME;

useSeoMeta({
  title: `${appName} - Login`,
  ogTitle: `${appName} - Login`,
});

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div
    class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
  >
    <div class="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>
