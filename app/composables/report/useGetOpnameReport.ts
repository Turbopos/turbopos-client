import { http } from "~/lib/http";
import type { OpnameReportRequest, OpnameReportResponse } from "~/types";

interface Props {
  limit?: number;
  user_id?: number;
  month?: string;
}

export default function (props?: Props) {
  const payload = ref<OpnameReportRequest>({
    page: 1,
    limit: props?.limit || 10,
    month: props?.month,
    user_id: props?.user_id,
  });

  const { result, error, refresh, loading } = useQuery<OpnameReportResponse>(
    (payload) => http().get("/report/opname", { params: payload }),
    payload.value,
  );

  watch(payload, () => {
    refresh(payload.value);
  });

  const data = computed(() => result.value?.opname_reports || []);
  const total = computed(() => result.value?.total || 0);
  const perPage = computed(() => result.value?.per_page || 10);

  return {
    data,
    total,
    perPage,
    payload,
    error,
    refresh,
    loading,
  };
}
