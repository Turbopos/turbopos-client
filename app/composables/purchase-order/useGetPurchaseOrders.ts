import type { PurchaseOrdersRequest, PurchaseOrdersResponse } from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<PurchaseOrdersRequest>({
    search: "",
    limit: props?.limit || 10,
    page: 1,
  });

  const { result, error, refresh, loading } = useQuery<PurchaseOrdersResponse>(
    (payload) => http().get("/purchase-order", { params: payload }),
    payload.value,
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