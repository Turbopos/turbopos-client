import { defineStore } from "pinia";
import type { User } from "~/types";
import userProfile from "~/composables/auth/userProfile";

export default defineStore("auth", () => {
  const user = ref<User | null>(null);

  const { result, loading } = userProfile();

  function setUser(value: User) {
    user.value = value;
  }

  function logout() {
    useCookie("token").value = null;
    user.value = null;

    useRouter().replace("/login");

    return true;
  }

  watch(result, () => {
    if (result.value) {
      user.value = result.value.profile;
    }
  });

  return {
    user,
    setUser,
    loading,
    logout,
  };
});
