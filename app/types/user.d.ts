import type { Role } from "~/utils/constants";

export interface User {
  id: any;
  nama: string;
  username: string;
  role: Role;
  is_admin?: boolean;
}

export interface UsersRequest {
  search: string;
  role?: Role | null;
}

export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}

export interface CreateUserRequest extends Omit<User, "id"> {
  password: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: any;
}
