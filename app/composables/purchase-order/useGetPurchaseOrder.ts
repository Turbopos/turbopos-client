import type { PurchaseOrderResponse } from "~/types";
import { http } from "~/lib/http";

export default function (id: number) {
  const { result, error, refresh, loading } = useQuery<PurchaseOrderResponse>(
    () => http().get(`/purchase-order/${id}`),
  );

  return {
    result,
    error,
    refresh,
    loading,
  };
}