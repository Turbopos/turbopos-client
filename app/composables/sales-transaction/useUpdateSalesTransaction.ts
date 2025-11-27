import { http } from "~/lib/http";
import type { UpdateSalesTransactionRequest } from "~/types";

export default function (id: number) {
  return useMutation<string, UpdateSalesTransactionRequest>((payload) =>
    http().put(`/sales-transaction/${id}`, payload),
  );
}