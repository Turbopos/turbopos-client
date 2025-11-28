import type { PurchaseOrderReportRequest, PurchaseOrderReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<PurchaseOrderReportRequest>({});

  const { result, error, refresh, loading } = useQuery<PurchaseOrderReportResponse>(
    (payload) => http().get("/report/purchase-order", { params: payload }),
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