import { http } from "~/lib/http";
import type { CreateDistributorRequest, DistributorResponse } from "~/types";

export default function () {
  return useMutation<DistributorResponse, CreateDistributorRequest>((payload) =>
    http().post("/distributor", payload),
  );
}