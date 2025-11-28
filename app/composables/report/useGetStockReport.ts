import type { StockReportRequest, StockReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<StockReportRequest>({});

  const { result, error, refresh, loading } = useQuery<StockReportResponse>(
    (payload) => http().get("/report/stock", { params: payload }),
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