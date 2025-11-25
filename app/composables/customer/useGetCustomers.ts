import type { CustomersRequest, CustomersResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<CustomersRequest>({
    search: "",
    limit: 10,
  });

  const { result, error, refresh, loading } = useQuery<CustomersResponse>(
    (payload) => http().get("/customer", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  return {
    result,
    error,
    refresh,
    loading,
    payload,
  };
}
