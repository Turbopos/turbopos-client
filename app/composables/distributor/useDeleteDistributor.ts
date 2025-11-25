import type { ActionResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  return useMutation<ActionResponse, number>((id) =>
    http().delete(`/distributor/${id}`),
  );
}