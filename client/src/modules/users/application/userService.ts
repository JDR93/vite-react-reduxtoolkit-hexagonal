import type { UserBase } from "../domain/entity";
import type { userRepositoryInterface } from "../domain/userRepositoryInterface";

export const userService = (
  repository: userRepositoryInterface
): userRepositoryInterface => {
  const findById = async (userId: number) => {
    return await repository.findById(userId);
  };

  const createUser = async (userData: UserBase) => {
    return await repository.createUser(userData);
  };

  const getAllUsers = async () => {
    return await repository.getAllUsers();
  };
  const removeUser = async (userId: number) => {
    return await repository.removeUser(userId);
  };

  const updateUser = async (userId: number, userData: Partial<UserBase>) => {
    return await repository.updateUser(userId, userData);
  };

  return { findById, createUser, getAllUsers, removeUser, updateUser };
};
