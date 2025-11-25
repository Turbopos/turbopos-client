import type { User } from "./user";

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProfileResponse {
  profile: User;
}
