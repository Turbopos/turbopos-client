import { http } from "~/lib/http";
import type { UserResponse, UpdateUserRequest } from "~/types";

export default function () {
  return useMutation<UserResponse, UpdateUserRequest>((payload) =>
    http().post(`/profile`, payload),
  );
}
