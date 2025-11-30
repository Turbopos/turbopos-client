import type {
  SalesTransactionsRequest,
  SalesTransactionsResponse,
} from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<SalesTransactionsRequest>({
    search: "",
    limit: props?.limit || 10,
    page: 1,
  });

  const { result, error, refresh, loading } =
    useQuery<SalesTransactionsResponse>(
      (payload) => http().get("/sales-transaction", { params: payload }),
      payload.value,
    );

  watch(
    payload,
    (current, old) => {
      if (current.search != old.search) {
        current.page = 1;
      }

      if (current.status == ("all" as any)) {
        current.status = undefined;
      }

      refresh(current);
    },
    { deep: true },
  );

  return {
    result,
    error,
    refresh,
    loading,
    payload,
  };
}
