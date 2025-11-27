import { http } from "~/lib/http";

export default function () {
  return useMutation<string, number>((id) =>
    http().delete(`/sales-transaction/${id}`),
  );
}