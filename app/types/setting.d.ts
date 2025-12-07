export interface Setting {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}

export interface SettingResponse {
  setting: Setting;
}

export interface UpdateSettingRequest {
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}
