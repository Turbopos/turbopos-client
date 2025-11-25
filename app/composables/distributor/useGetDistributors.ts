import type { DistributorsRequest, DistributorsResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<DistributorsRequest>({
    search: "",
    limit: 10,
  });

  const { result, error, refresh, loading } = useQuery<DistributorsResponse>(
    (payload) => http().get("/distributor", { params: payload }),
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
