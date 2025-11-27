import { http } from "~/lib/http";
import type { ActionResponse } from "~/types";

export default function () {
  return useMutation<ActionResponse, number>((id) =>
    http().delete(`/purchase-order/${id}`),
  );
}
