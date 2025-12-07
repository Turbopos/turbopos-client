import { useGetSetting } from "~/composables/setting/useGetSetting";
import type { Setting } from "~/types";

export const useSettingStore = defineStore("setting", () => {
  const { result, loading } = useGetSetting();
  const setting = ref<Setting | null | undefined>();

  const setSetting = (value: Setting) => {
    setting.value = value;
  };

  watch(
    result,
    () => {
      setting.value = result.value?.setting;
    },
    { deep: true },
  );

  return {
    setting,
    setSetting,
    loading,
  };
});
