import type { Distributor, ProductsRequest, ProductsResponse } from "~/types";
import { http } from "~/lib/http";

interface Props {
  distributor_id?: number;
  limit?: number;
}

export default function (props?: Props) {
  const distributor = ref<Distributor>();
  const payload = ref<ProductsRequest>({
    limit: props?.limit || 10,
    search: "",
    page: 1,
    distributor_id: props?.distributor_id,
    jenis: "" as any,
  });

  const { result, error, refresh, loading } = useQuery<ProductsResponse>(
    (payload) => http().get("/product", { params: payload }),
    payload.value,
  );

  watch(distributor, () => {
    payload.value.distributor_id = distributor.value?.id || undefined;
  });

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
    distributor,
  };
}
