import type { CategoriesRequest, CategoriesResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<CategoriesRequest>({
    search: "",
  });

  const { result, error, refresh, loading } = useQuery<CategoriesResponse>(
    (payload) => http().get("/category", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  return {
    result,
    error,
    refresh,
    loading,
  };
}