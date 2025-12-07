<script lang="ts" setup>
useSettingStore();

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const loading = ref(true);

watch(
  () => auth.loading,
  (current, old) => {
    if (!old && current) {
      return;
    }

    setTimeout(() => {
      loading.value = false;
    }, 800);

    let redirectTo = "/login";

    if (!current && !!auth.user) {
      redirectTo = "/dashboard";
    }

    if (route.fullPath == redirectTo) {
      return;
    }

    if (
      redirectTo.includes("dashboard") &&
      (!route.fullPath.includes("login") ||
        !route.fullPath.includes("register"))
    ) {
      return;
    }

    router.replace(redirectTo);
  },
);

definePageMeta({
  layout: "plain",
});
</script>

<template>
  <div
    class="fixed z-50 flex items-center justify-center w-screen h-screen bg-background"
    v-if="loading && !route.path.includes('print')"
  >
    <Spinner class="size-10 text-primary"></Spinner>
  </div>

  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
