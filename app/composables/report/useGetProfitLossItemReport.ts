import type { ProfitLossItemReportRequest, ProfitLossItemReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<ProfitLossItemReportRequest>({});

  const { result, error, refresh, loading } = useQuery<ProfitLossItemReportResponse>(
    (payload) => http().get("/report/profit-loss-item", { params: payload }),
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