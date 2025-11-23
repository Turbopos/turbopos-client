<script lang="ts" setup>
const auth = useAuthStore();

watch(
  () => auth.loading,
  (value) => {
    if (!value && !!auth.user) {
      navigateTo("/dashboard");
    }
  },
);
</script>

<template></template>
