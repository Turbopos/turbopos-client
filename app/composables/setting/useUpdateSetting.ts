import { http } from "~/lib/http";
import type { SettingResponse, UpdateSettingRequest } from "~/types";

export function useUpdateSetting() {
  return useMutation<SettingResponse, UpdateSettingRequest>((params) =>
    http().put("/setting", params),
  );
}
