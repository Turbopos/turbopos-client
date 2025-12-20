import type {
  Distributor,
  ProductsRequest,
  ProductsResponse,
  SortValue,
} from "~/types";
import { http } from "~/lib/http";

interface Props {
  distributor_id?: number;
  limit?: number;
}

export default function (props?: Props) {
  const distributor = ref<Distributor>();
  const sort = ref<SortValue>({
    field: "nama",
    order: "asc",
  });
  const payload = ref<ProductsRequest>({
    limit: props?.limit || 10,
    search: "",
    page: 1,
    distributor_id: props?.distributor_id,
    jenis: "" as any,
    order_by: sort.value.field,
    sort: sort.value.order,
  });

  const { result, error, refresh, loading } = useQuery<ProductsResponse>(
    (payload) => http().get("/product", { params: payload }),
    payload.value,
  );

  watch(distributor, () => {
    payload.value.distributor_id = distributor.value?.id || undefined;
  });

  watch(sort, () => {
    payload.value.order_by = sort.value.field;
    payload.value.sort = sort.value.order;
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
    sort,
  };
}
