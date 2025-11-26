import { http } from "~/lib/http";
import type { CreateCustomerTransportRequest, CustomerTransportResponse } from "~/types";

export default function () {
  return useMutation<CustomerTransportResponse, CreateCustomerTransportRequest>((payload) =>
    http().post("/customer-transport", payload),
  );
}