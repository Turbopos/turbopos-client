import type { User } from "./user";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProfileResponse {
  profile: User;
}
