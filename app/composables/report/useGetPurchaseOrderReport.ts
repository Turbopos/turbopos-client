import type {
  PurchaseOrderReportRequest,
  PurchaseOrderReportResponse,
} from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
  distributor_id?: number;
  month?: string;
}

export default function (props?: Props) {
  const payload = ref<PurchaseOrderReportRequest>({
    page: 1,
    limit: props?.limit || 10,
    month: props?.month,
    distributor_id: props?.distributor_id,
  });

  const { result, error, refresh, loading } =
    useQuery<PurchaseOrderReportResponse>(
      (payload) => http().get("/report/purchase-order", { params: payload }),
      payload.value,
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
