import { http } from "~/lib/http";
import type { UpdateSalesTransactionStatusRequest } from "~/types";

export default function (id: number) {
  return useMutation<string, UpdateSalesTransactionStatusRequest>((payload) =>
    http().put(`/sales-transaction/${id}/status`, payload),
  );
}
