export enum Role {
  Admin = "admin",
  Mekanik = "mekanik",
  Operator = "operator",
}

export interface User {
  id: number;
  nama: string;
  email: string;
  role: Role;
}
