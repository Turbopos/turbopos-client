import { http } from "~/lib/http";
import type { ProductResponse } from "~/types";

export default function (id: number) {
  return useQuery<ProductResponse, number>(
    (id) => http().get(`/product/${id}`),
    id,
  );
}