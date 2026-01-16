import { env } from "../../../../shared/config/env";
import type { User, UserBase } from "../../domain/entity";
import type { userRepositoryInterface } from "../../domain/userRepositoryInterface";
import { FetchHttpClient } from "../http/fetchHttpClient";

export const postgresUserRepository = (): userRepositoryInterface => {
  const http = new FetchHttpClient(env.API_BASE_URL);

  const findById = (userId: number): Promise<User | null> => {
    return http.get<User | null>(`users/${userId}`);
  };
  const createUser = async (userData: User): Promise<void> => {
    return http.post<User>("users", userData);
  };
  const getAllUsers = async (): Promise<User[]> => {
    return http.get<User[]>("users");
  };
  const removeUser = async (userId: number): Promise<void> => {
    return http.delete(`users/${userId}`);
  };
  const updateUser = async (
    userId: number,
    userData: UserBase
  ): Promise<void> => {
    return http.put<UserBase>(`users/${userId}`, userData);
  };

  return {
    findById,
    createUser,
    getAllUsers,
    removeUser,
    updateUser,
  };
};
