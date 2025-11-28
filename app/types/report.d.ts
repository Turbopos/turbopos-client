export interface PurchaseOrderReportItem {
  nama_barang: string;
  jml: number;
  satuan: string;
  harga_pokok: number;
  sub_total: number;
}

export interface PurchaseOrderReportResponse {
  report: PurchaseOrderReportItem[];
  total_keseluruhan: number;
}

export interface PurchaseOrderReportRequest {
  month?: string;
  distributor_id?: number;
}

export interface SalesTransactionReportItem {
  nama_barang: string;
  jml: number;
  satuan: string;
  harga_jual: number;
  sub_total: number;
}

export interface SalesTransactionReportResponse {
  report: SalesTransactionReportItem[];
  total_keseluruhan: number;
}

export interface SalesTransactionReportRequest {
  month?: string;
  category_id?: number;
}

export interface ProfitLossItemReportItem {
  nama_barang: string;
  jml: number;
  satuan: string;
  harga_beli: number;
  harga_jual: number;
  laba_rugi: number;
}

export interface ProfitLossItemReportResponse {
  report: ProfitLossItemReportItem[];
  total_keseluruhan: number;
}

export interface ProfitLossItemReportRequest {
  month?: string;
}

export interface ProfitLossCategoryReportItem {
  kategori: string;
  total_laba_rugi: number;
}

export interface ProfitLossCategoryReportResponse {
  report: ProfitLossCategoryReportItem[];
  total_keseluruhan: number;
}

export interface ProfitLossCategoryReportRequest {
  month?: string;
}

export interface StockReportItem {
  nama_barang: string;
  jml: number;
  satuan: string;
  stok: number;
}

export interface StockReportResponse {
  report: StockReportItem[];
}

export interface StockReportRequest {
  category_id?: number;
  jenis?: string;
}