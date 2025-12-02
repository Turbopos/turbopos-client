import type { UsersRequest, UsersResponse } from "~/types";
import { http } from "~/lib/http";
import type { Role } from "~/utils/constants";

interface Props {
  limit?: number;
  role?: Role;
}

export default function (props?: Props) {
  const payload = ref<UsersRequest>({
    role: props?.role,
    search: "",
  });

  const { result, error, refresh, loading } = useQuery<UsersResponse>(
    (payload) => http().get("/user", { params: payload }),
    payload.value,
  );

  watch(
    payload,
    () => {
      refresh(payload.value);
    },
    {
      deep: true,
    },
  );

  return {
    result,
    error,
    refresh,
    loading,
    payload,
  };
}
