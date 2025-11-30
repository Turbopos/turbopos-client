import type {
  SalesTransactionReportRequest,
  SalesTransactionReportResponse,
} from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
  month?: string;
  category_id?: number;
}

export default function (props?: Props) {
  const payload = ref<SalesTransactionReportRequest>({
    page: 1,
    limit: props?.limit || 10,
    month: props?.month,
    category_id: props?.category_id,
  });

  const { result, error, refresh, loading } =
    useQuery<SalesTransactionReportResponse>((payload) =>
      http().get("/report/sales-transaction", { params: payload }),
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
