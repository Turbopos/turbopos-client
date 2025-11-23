import type { AxiosResponse } from "axios";

export function useQuery<T, P = any>(
  fn: (payload?: P) => Promise<AxiosResponse>,
) {
  const loading = ref(false);
  const result = ref<T>();
  const error = ref<Error>();

  onMounted(async (payload?: P) => {
    loading.value = true;

    try {
      const { data } = await fn(payload);
      result.value = data;
    } catch (err: any) {
      error.value = new Error(err?.message || err || "Terjadi kesalahan");
    }

    loading.value = false;
  });

  return {
    loading,
    result,
    error,
  };
}

export function useMutation<T, P = any>(
  fn: (payload?: P) => Promise<AxiosResponse>,
) {
  const loading = ref(false);
  const result = ref<T>();
  const error = ref<Error>();

  const execute = async (payload?: P) => {
    loading.value = true;

    try {
      const { data } = await fn(payload);
      result.value = data;
    } catch (err: any) {
      error.value = new Error(err?.message || err || "Terjadi kesalahan");
    }

    loading.value = false;
  };

  return {
    loading,
    result,
    error,
    execute,
  };
}
