import type { LoginDto, LoginResponse } from "~/@types";
import { http } from "~/lib/http";

export default function useLogin() {
  return useMutation<LoginResponse, LoginDto>((payload) =>
    http().post("/login", payload),
  );
}
