import { http } from "~/lib/http";
import type { CustomerResponse } from "~/types";

export default function (id: any) {
  return useQuery<CustomerResponse, number>(
    (id) => http().get(`/customer/${id}`),
    id,
  );
}
