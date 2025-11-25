import { http } from "~/lib/http";
import type { CategoryResponse, UpdateCategoryRequest } from "~/types";

export default function () {
  return useMutation<CategoryResponse, UpdateCategoryRequest>((payload) =>
    http().put(`/category/${payload!.id}`, payload),
  );
}