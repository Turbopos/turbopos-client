import { http } from "~/lib/http";
import type { UserResponse } from "~/types";

export default function (id: any) {
  return useQuery<UserResponse, number>((id) => http().get(`/user/${id}`), id);
}
