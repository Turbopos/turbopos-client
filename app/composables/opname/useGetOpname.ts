import type { OpnameResponse } from "~/types";
import { http } from "~/lib/http";

export default function (id: number) {
  const { result, error, refresh, loading } = useQuery<OpnameResponse>(() =>
    http().get(`/opname/${id}`),
  );

  return {
    result,
    error,
    refresh,
    loading,
  };
}
