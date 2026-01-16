import type { User, UserBase } from "../../domain/entity";
import type { userRepositoryInterface } from "../../domain/userRepositoryInterface";

export const localStorageUserRepository = (): userRepositoryInterface => {
  const findById = async (userId: number): Promise<User | null> => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user: { id: number }) => user.id === userId);
    return Promise.resolve(user || null);
  };

  const createUser = async (userData: UserBase) => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("users") || "[]"),
        userData,
      ])
    );
    return Promise.resolve();
  };

  const getAllUsers = async () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return Promise.resolve(users);
  };

  const removeUser = async (userId: number) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const filteredUsers = users.filter(
      (user: { id: number }) => user.id !== userId
    );
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    return Promise.resolve();
  };

  const updateUser = async (userId: number, userData: Partial<UserBase>) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: { id: number }) =>
      user.id === userId ? { ...user, ...userData } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return Promise.resolve();
  };

  return {
    findById,
    createUser,
    getAllUsers,
    removeUser,
    updateUser,
  };
};
