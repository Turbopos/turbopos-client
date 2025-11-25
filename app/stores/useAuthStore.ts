import { defineStore } from "pinia";
import type { User } from "~/types";
import userProfile from "~/composables/auth/userProfile";

export default defineStore("auth", () => {
  const user = ref<User | null>(null);

  const { result, loading } = userProfile();

  watch(result, () => {
    if (result.value) {
      user.value = result.value.profile;
    }
  });

  return {
    user,
    loading,
  };
});
