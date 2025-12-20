import type { Category } from "./category";
import type { Distributor } from "./distributor";

export interface Product {
  id: number;
  kode: string;
  jenis: "barang" | "jasa";
  category_id: number;
  category?: Category;
  nama: string;
  sn?: string;
  barcode: string;
  distributor_id?: number;
  distributor?: Distributor;
  harga_pokok?: number;
  harga_jual: number;
  stok?: number;
  satuan?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductsRequest {
  jenis?: "barang" | "jasa";
  category_id?: number;
  distributor_id?: number;
  search?: string;
  limit?: number;
  page?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  per_page: number;
}

export interface ProductResponse {
  product: Product;
}

export interface CreateProductRequest {
  jenis: "barang" | "jasa";
  category_id: number;
  nama: string;
  sn?: string;
  distributor_id?: number;
  harga_pokok?: number;
  harga_jual: number;
  stok?: number;
  satuan?: string;
}

export interface UpdateProductRequest {
  id: number;
  jenis?: "barang" | "jasa";
  category_id?: number;
  nama?: string;
  sn?: string;
  distributor_id?: number;
  harga_pokok?: number;
  harga_jual?: number;
  stok?: number;
  satuan?: string;
}
