import type { ProfitLossItemReportRequest, ProfitLossItemReportResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<ProfitLossItemReportRequest>({
    page: 1,
    limit: 10,
  });

  const { result, error, refresh, loading } = useQuery<ProfitLossItemReportResponse>(
    (payload) => http().get("/report/profit-loss-item", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.profit_loss_items || []);
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