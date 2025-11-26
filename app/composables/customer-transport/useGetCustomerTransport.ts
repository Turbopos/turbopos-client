import type { CustomerTransportResponse } from "~/types";
import { http } from "~/lib/http";

export default function (id: number) {
  const { result, error, refresh, loading } = useQuery<CustomerTransportResponse>(
    () => http().get(`/customer-transport/${id}`),
  );

  return {
    result,
    error,
    refresh,
    loading,
  };
}