import type {
  ProfitLossCategoryReportRequest,
  ProfitLossCategoryReportResponse,
} from "~/types";
import { http } from "~/lib/http";

export interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<ProfitLossCategoryReportRequest>({
    page: 1,
    limit: props?.limit || 10,
  });

  const { result, error, refresh, loading } =
    useQuery<ProfitLossCategoryReportResponse>((payload) =>
      http().get("/report/profit-loss-category", { params: payload }),
    );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.profit_loss_categories || []);
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
