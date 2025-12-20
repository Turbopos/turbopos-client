import type { Distributor } from "./distributor";
import type { Product } from "./product";
import type { User } from "./user";

export interface PurchaseOrderDetail {
  id: number;
  product_id: number;
  harga_pokok: number;
  jumlah: number;
  ppn: number;
  diskon: number;
  subtotal: number;
  product: Product;
}

export interface PurchaseOrder {
  id: number;
  kode: string;
  distributor_id: number;
  user_id: number;
  ppn: number;
  subtotal: number;
  diskon: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  transaction_at: string;
  created_at: string;
  updated_at: string;
  distributor: Distributor;
  user: User;
  details: PurchaseOrderDetail[];
}

export interface PurchaseOrdersRequest {
  status?: "pending" | "completed" | "cancelled";
  distributor_id?: number;
  user_id?: number;
  search?: string;
  transaction_at_from?: string;
  transaction_at_to?: string;
  limit?: number;
  page?: number;
}

export interface PurchaseOrdersResponse {
  purchase_orders: PurchaseOrder[];
  total: number;
  per_page: number;
}

export interface PurchaseOrderResponse {
  purchase_order: PurchaseOrder;
}

export interface CreatePurchaseOrderItem {
  product_id: number;
  harga_pokok: number;
  jumlah: number;
  ppn?: number;
  diskon?: number;
}

export interface CreatePurchaseOrderRequest {
  distributor_id: number;
  ppn?: number;
  diskon?: number;
  transaction_at?: string;
  items: CreatePurchaseOrderItem[];
}

export interface UpdatePurchaseOrderRequest {
  ppn?: number;
  diskon?: number;
  transaction_at?: string;
  items?: CreatePurchaseOrderItem[];
}

export interface UpdatePurchaseOrderStatusRequest {
  status: "pending" | "completed" | "cancelled";
}
