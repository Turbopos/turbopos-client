import type {
  PurchaseOrderReportRequest,
  PurchaseOrderReportResponse,
} from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<PurchaseOrderReportRequest>({
    page: 1,
    limit: 10,
  });

  const { result, error, refresh, loading } =
    useQuery<PurchaseOrderReportResponse>((payload) =>
      http().get("/report/purchase-order", { params: payload }),
    );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.purchase_order_reports || []);
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
