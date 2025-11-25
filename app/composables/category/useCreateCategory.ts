import { http } from "~/lib/http";
import type { CreateCategoryRequest, CategoryResponse } from "~/types";

export default function () {
  return useMutation<CategoryResponse, CreateCategoryRequest>((payload) =>
    http().post("/category", payload),
  );
}