import type { Product } from "./product";
import type { User } from "./user";

export interface OpnameDetail {
  id;
  number;
  product_id: number;
  harga_pokok: number;
  jumlah_awal: number;
  jumlah_opname: number;
  selisih: number;
  total_selisih: number;
  product: Product;
}

export interface Opname {
  id: number;
  kode: string;
  user_id: number;
  total: number;
  transaction_at: string;
  created_at: string;
  updated_at: string;
  user: User;
  details: OpnameDetail[];
}

export interface OpnamesRequest {
  user_id?: number;
  search?: string;
  transaction_at_from?: string;
  transaction_at_to?: string;
  limit?: number;
  page?: number;
}

export interface OpnamesResponse {
  opnames: Opname[];
  total: number;
  per_page: number;
}

export interface OpnameResponse {
  opname: Opname;
}

export interface CreateOpnameItem {
  product_id: number;
  harga_pokok: number;
  jumlah_awal: number;
  jumlah_opname: number;
}

export interface CreateOpnameRequest {
  transaction_at?: string;
  items: CreateOpnameItem[];
}
