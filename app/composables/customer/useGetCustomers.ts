import type { CustomersRequest, CustomersResponse } from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<CustomersRequest>({
    search: "",
    limit: props?.limit || 10,
    page: 1,
  });

  const { result, error, refresh, loading } = useQuery<CustomersResponse>(
    (payload) => http().get("/customer", { params: payload }),
  );

  watch(
    payload,
    (current, old) => {
      if (current.search != old.search) {
        current.page = 1;
      }

      refresh(current);
    },
    { deep: true },
  );

  return {
    result,
    error,
    refresh,
    loading,
    payload,
  };
}
