import type { DashboardSummaryResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const { result, error, refresh, loading } = useQuery<DashboardSummaryResponse>(
    () => http().get("/report/dashboard"),
  );

  const data = computed(() => result.value?.data);

  return {
    data,
    error,
    refresh,
    loading,
  };
}