import { http } from "~/lib/http";
import type { CreateUserRequest, UserResponse } from "~/types";

export default function () {
  return useMutation<UserResponse, CreateUserRequest>((payload) =>
    http().post("/user", payload),
  );
}
