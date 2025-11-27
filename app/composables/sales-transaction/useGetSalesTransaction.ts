import type { SalesTransactionResponse } from "~/types";
import { http } from "~/lib/http";

export default function (id: number) {
  const { result, error, refresh, loading } = useQuery<SalesTransactionResponse>(
    () => http().get(`/sales-transaction/${id}`),
  );

  return {
    result,
    error,
    refresh,
    loading,
  };
}