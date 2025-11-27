import { http } from "~/lib/http";
import type { UpdatePurchaseOrderStatusRequest } from "~/types";

export default function (id: number) {
  return useMutation<string, UpdatePurchaseOrderStatusRequest>((payload) =>
    http().patch(`/purchase-order/${id}/status`, payload),
  );
}