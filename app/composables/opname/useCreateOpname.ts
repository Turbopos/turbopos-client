import { http } from "~/lib/http";
import type { CreateOpnameRequest } from "~/types";

export default function () {
  return useMutation<string, CreateOpnameRequest>((payload) =>
    http().post("/purchase-order", payload),
  );
}
