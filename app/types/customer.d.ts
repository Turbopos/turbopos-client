export interface Customer {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
  whatsapp?: string;
  keterangan?: string;
  created_at: string;
  updated_at: string;
  transports?: any[];
}

export interface CustomersRequest {
  search?: string;
  limit?: number;
  page?: number;
}

export interface CustomersResponse {
  customers: Customer[];
  total: number;
  per_page: number;
}

export interface CustomerResponse {
  customer: Customer;
}

export interface CreateCustomerRequest {
  nama: string;
  alamat: string;
  telepon: string;
  whatsapp?: string;
  keterangan?: string;
}

export interface UpdateCustomerRequest extends CreateCustomerRequest {
  id: number;
}
