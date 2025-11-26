import { http } from "~/lib/http";
import type { ProductResponse, UpdateProductRequest } from "~/types";

export default function () {
  return useMutation<ProductResponse, UpdateProductRequest>((payload) =>
    http().put(`/product/${payload!.id}`, payload),
  );
}