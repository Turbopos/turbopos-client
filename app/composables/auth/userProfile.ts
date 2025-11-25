import type { ProfileResponse } from "~/types";
import { http } from "~/lib/http";

export default function () {
  return useQuery<ProfileResponse>(() => http().get("/profile"));
}
