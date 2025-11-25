export interface Distributor {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
  whatsapp?: string;
  created_at: string;
  updated_at: string;
  products?: any[];
}

export interface DistributorsRequest {
  search?: string;
  limit?: number;
}

export interface DistributorsResponse {
  distributors: Distributor[];
  total: number;
  per_page: number;
}

export interface DistributorResponse {
  distributor: Distributor;
}

export interface CreateDistributorRequest {
  nama: string;
  alamat: string;
  telepon: string;
  whatsapp?: string;
}

export interface UpdateDistributorRequest extends CreateDistributorRequest {
  id: number;
}