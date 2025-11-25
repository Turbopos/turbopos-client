import { http } from "~/lib/http";
import type { CreateCustomerRequest, CustomerResponse } from "~/types";

export default function () {
  return useMutation<CustomerResponse, CreateCustomerRequest>((payload) =>
    http().post("/customer", payload),
  );
}