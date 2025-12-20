import type { OpnamesRequest, OpnamesResponse } from "~/types";
import { http } from "~/lib/http";

interface Props {
  limit?: number;
}

export default function (props?: Props) {
  const payload = ref<OpnamesRequest>({
    search: "",
    limit: props?.limit || 10,
    page: 1,
  });

  const { result, error, refresh, loading } = useQuery<OpnamesResponse>(
    (payload) => http().get("/opname", { params: payload }),
    payload.value,
  );

  watch(
    payload,
    (current, old) => {
      if (current.search != old.search) {
        current.page = 1;
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
