export interface PurchaseOrderReportItem {
  nama_barang: string;
  jumlah: number;
  satuan: string;
  harga_pokok: number;
  sub_total: number;
  total: number;
}

export interface PurchaseOrderReportResponse {
  purchase_order_reports: PurchaseOrderReportItem[];
  total: number;
  per_page: number;
}

export interface PurchaseOrderReportRequest {
  month?: string;
  distributor_id?: number;
  limit?: number;
  page?: number;
}

export interface OpnameReportItem {
  nama_barang: string;
  jumlah_awal: number;
  jumlah_opname: number;
  selisih: number;
  satuan: string;
  harga_pokok: number;
  total: number;
}

export interface OpnameReportResponse {
  opname_reports: OpnameReportItem[];
  total: number;
  per_page: number;
}

export interface OpnameReportRequest {
  month?: string;
  user_id?: number;
  limit?: number;
  page?: number;
}

export interface SalesTransactionReportItem {
  nama_barang: string;
  jumlah: number;
  satuan: string;
  harga_jual: number;
  sub_total: number;
  total: number;
}

export interface SalesTransactionReportResponse {
  sales_transaction_reports: SalesTransactionReportItem[];
  total: number;
  per_page: number;
}

export interface SalesTransactionReportRequest {
  month?: string;
  category_id?: number;
  limit?: number;
  page?: number;
}

export interface ProfitLossItemReportItem {
  nama_barang: string;
  jumlah: number;
  satuan: string;
  harga_beli: number;
  harga_jual: number;
  laba_rugi: number;
}

export interface ProfitLossItemReportResponse {
  profit_loss_items: ProfitLossItemReportItem[];
  total: number;
  per_page: number;
}

export interface ProfitLossItemReportRequest {
  month?: string;
  limit?: number;
  page?: number;
}

export interface ProfitLossCategoryReportItem {
  kategori: string;
  total_laba_rugi: number;
}

export interface ProfitLossCategoryReportResponse {
  profit_loss_categories: ProfitLossCategoryReportItem[];
  total: number;
  per_page: number;
}

export interface ProfitLossCategoryReportRequest {
  month?: string;
  limit?: number;
  page?: number;
}

export interface StockReportItem {
  nama_barang: string;
  harga_pokok: number;
  jumlah: number;
  satuan: string;
  subtotal: number;
}

export interface StockReportResponse {
  stock_reports: StockReportItem[];
  total: number;
  per_page: number;
}

export interface StockReportRequest {
  category_id?: number;
  limit?: number;
  page?: number;
}

export interface DashboardSummaryData {
  total_penjualan_hari_ini: number;
  jumlah_transaksi_hari_ini: number;
  produk_terlaris: {
    nama: string;
    total_jumlah: number;
    satuan: string;
  };
  produk_stok_rendah: number;
}

export interface DashboardSummaryResponse {
  data: DashboardSummaryData;
}
