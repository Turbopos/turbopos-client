import { http } from "~/lib/http";
import type {
  UpdateCustomerTransportRequest,
  CustomerTransportResponse,
} from "~/types";

export default function () {
  return useMutation<CustomerTransportResponse, UpdateCustomerTransportRequest>(
    (payload) => http().put(`/customer-transport/${payload?.id}`, payload),
  );
}
