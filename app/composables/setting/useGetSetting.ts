import { http } from "~/lib/http";
import type { SettingResponse } from "~/types";

export function useGetSetting() {
  return useQuery<SettingResponse>(() => http().get("/setting"));
}
