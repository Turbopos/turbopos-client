import type { StockReportRequest, StockReportResponse } from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<StockReportRequest>({
    page: 1,
    limit: props?.limit || 10,
  });

  const { result, error, refresh, loading } = useQuery<StockReportResponse>(
    (payload) => http().get("/report/stock", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.stock_reports || []);
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
