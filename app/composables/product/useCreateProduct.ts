import { http } from "~/lib/http";
import type { CreateProductRequest, ProductResponse } from "~/types";

export default function () {
  return useMutation<ProductResponse, CreateProductRequest>((payload) =>
    http().post("/product", payload),
  );
}