import { http } from "~/lib/http";
import type { DistributorResponse } from "~/types";

export default function (id: any) {
  return useQuery<DistributorResponse, number>(
    (id) => http().get(`/distributor/${id}`),
    id,
  );
}
