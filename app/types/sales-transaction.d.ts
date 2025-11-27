export interface SalesTransactionDetail {
  id: number;
  product_id: number;
  harga_pokok: number;
  harga_jual: number;
  jumlah: number;
  ppn: number;
  diskon: number;
  subtotal: number;
  total: number;
  product: {
    id: number;
    nama: string;
  };
}

export interface SalesTransaction {
  id: number;
  kode: string;
  customer_id: number;
  user_id: number;
  transport_id?: number;
  ppn: number;
  subtotal: number;
  diskon: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  transaction_at: string;
  created_at: string;
  updated_at: string;
  customer?: {
    id: number;
    nama: string;
  };
  user: {
    id: number;
    nama: string;
  };
  transport?: {
    id: number;
    nama: string;
    no_polisi: string;
  };
  details: SalesTransactionDetail[];
}

export interface SalesTransactionsRequest {
  status?: "pending" | "completed" | "cancelled";
  customer_id?: number;
  user_id?: number;
  search?: string;
  transaction_at_from?: string;
  transaction_at_to?: string;
  limit?: number;
  page?: number;
}

export interface SalesTransactionsResponse {
  sales_transactions: SalesTransaction[];
  total: number;
  per_page: number;
}

export interface SalesTransactionResponse {
  sales_transaction: SalesTransaction;
}

export interface CreateSalesTransactionItem {
  product_id: number;
  jumlah: number;
  ppn?: number;
  diskon?: number;
}

export interface CreateSalesTransactionRequest {
  customer_id?: number;
  transport_id?: number;
  ppn?: number;
  diskon?: number;
  transaction_at?: string;
  items: CreateSalesTransactionItem[];
}

export interface UpdateSalesTransactionRequest {
  ppn?: number;
  diskon?: number;
  items: CreateSalesTransactionItem[];
}

export interface UpdateSalesTransactionStatusRequest {
  status: "pending" | "completed" | "cancelled";
}
