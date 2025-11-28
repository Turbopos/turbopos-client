import type { SalesTransactionReportRequest, SalesTransactionReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<SalesTransactionReportRequest>({
    page: 1,
    limit: 10,
  });

  const { result, error, refresh, loading } = useQuery<SalesTransactionReportResponse>(
    (payload) => http().get("/report/sales-transaction", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.sales_transaction_reports || []);
  const total = computed(() => result.value?.total || 0);
  const perPage = computed(() => result.value?.per_page || 10);

  return {
    data,
    total,
    perPage,
    payload,
    error,
    refresh,
    loading,
  };
}