import type {
  ProfitLossCategoryReportRequest,
  ProfitLossCategoryReportResponse,
} from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<ProfitLossCategoryReportRequest>({});

  const { result, error, refresh, loading } =
    useQuery<ProfitLossCategoryReportResponse>((payload) =>
      http().get("/report/profit-loss-category", { params: payload }),
    );

  watch(payload, (current) => {
    refresh(payload.value);
  });

  return {
    result,
    error,
    refresh,
    loading,
  };
}
