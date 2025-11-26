import type { ProductsRequest, ProductsResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  const payload = ref<ProductsRequest>({
    limit: 10,
    search: "",
    page: 1,
    jenis: "all" as any,
  });

  const { result, error, refresh, loading } = useQuery<ProductsResponse>(
    (payload) => http().get("/product", { params: payload }),
  );

  watch(
    payload,
    (current, old) => {
      if (current.page == old.page) {
        current.page = 1;
      }

      if ((current.jenis as any) == "all") {
        current.jenis = undefined;
      }

      refresh(current);
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
