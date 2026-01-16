import type { User, UserBase } from "./entity";

export interface userRepositoryInterface {
  createUser(user: UserBase): Promise<void>;
  findById(userId: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  removeUser(userId: number): Promise<void>;
  updateUser(userId: number, userData: Partial<UserBase>): Promise<void>;
}
