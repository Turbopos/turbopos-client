export interface Category {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriesRequest {
  search?: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface CategoryResponse {
  category: Category;
}

export interface CreateCategoryRequest {
  nama: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}
