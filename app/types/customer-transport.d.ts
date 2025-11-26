export interface CustomerTransport {
  id: number;
  customer_id: number;
  nama: string;
  jenis_kendaraan: string;
  merk: string;
  no_polisi: string;
  sn: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerTransportsRequest {
  customer_id?: number;
  search?: string;
  limit?: number;
}

export interface CustomerTransportsResponse {
  transports: CustomerTransport[];
  total: number;
  per_page: number;
}

export interface CustomerTransportResponse {
  transport: CustomerTransport;
}

export interface CreateCustomerTransportRequest {
  customer_id: number;
  nama: string;
  jenis_kendaraan: string;
  merk: string;
  no_polisi: string;
  sn?: string;
}

export interface UpdateCustomerTransportRequest {
  id?: number;
  customer_id?: number;
  nama?: string;
  jenis_kendaraan?: string;
  merk?: string;
  no_polisi?: string;
  sn?: string;
}
