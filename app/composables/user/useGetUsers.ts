import type { UsersRequest, UsersResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<UsersRequest>({
    role: null,
    search: "",
  });

  const { result, error, refresh, loading } = useQuery<UsersResponse>(
    (payload) => http().get("/user", { params: payload }),
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  return {
    result,
    error,
    refresh,
    loading,
    payload,
  };
}
