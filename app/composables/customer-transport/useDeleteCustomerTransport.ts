import { http } from "~/lib/http";

export default function () {
  return useMutation<{ message: string }, number>((id) =>
    http().delete(`/customer-transport/${id}`),
  );
}
