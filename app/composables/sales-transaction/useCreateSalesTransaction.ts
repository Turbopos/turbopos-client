import { http } from "~/lib/http";
import type { CreateSalesTransactionRequest } from "~/types";

export default function () {
  return useMutation<string, CreateSalesTransactionRequest>((payload) =>
    http().post("/sales-transaction", payload),
  );
}