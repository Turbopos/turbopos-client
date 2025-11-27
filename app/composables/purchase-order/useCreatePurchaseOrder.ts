import { http } from "~/lib/http";
import type { CreatePurchaseOrderRequest } from "~/types";

export default function () {
  return useMutation<string, CreatePurchaseOrderRequest>((payload) =>
    http().post("/purchase-order", payload),
  );
}