import { http } from "~/lib/http";
import type { CustomerResponse, UpdateCustomerRequest } from "~/types";

export default function () {
  return useMutation<CustomerResponse, UpdateCustomerRequest>((payload) =>
    http().put(`/customer/${payload!.id}`, payload),
  );
}