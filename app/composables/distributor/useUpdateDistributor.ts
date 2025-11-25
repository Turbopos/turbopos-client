import { http } from "~/lib/http";
import type { DistributorResponse, UpdateDistributorRequest } from "~/types";

export default function () {
  return useMutation<DistributorResponse, UpdateDistributorRequest>((payload) =>
    http().put(`/distributor/${payload!.id}`, payload),
  );
}