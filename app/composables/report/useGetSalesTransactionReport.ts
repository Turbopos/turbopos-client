import type { SalesTransactionReportRequest, SalesTransactionReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<SalesTransactionReportRequest>({});

  const { result, error, refresh, loading } = useQuery<SalesTransactionReportResponse>(
    (payload) => http().get("/report/sales-transaction", { params: payload }),
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