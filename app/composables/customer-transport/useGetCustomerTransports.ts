import type {
  CustomerTransportsRequest,
  CustomerTransportsResponse,
} from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
  customerId: number;
}

export default function (props?: Props) {
  const payload = ref<CustomerTransportsRequest>({
    search: "",
    limit: props?.limit || 10,
    customer_id: props?.customerId,
  });

  const { result, error, refresh, loading } =
    useQuery<CustomerTransportsResponse>(
      (payload) => http().get("/customer-transport", { params: payload }),
      payload.value,
    );

  watch(
    payload,
    () => {
      refresh(payload.value);
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
