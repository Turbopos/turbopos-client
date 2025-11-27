import { http } from "~/lib/http";
import type { UpdatePurchaseOrderRequest } from "~/types";

export default function (id: number) {
  return useMutation<string, UpdatePurchaseOrderRequest>((payload) =>
    http().put(`/purchase-order/${id}`, payload),
  );
}