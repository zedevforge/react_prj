import { BASE_URL } from "../constants";
import type { User, UsersResponse } from "../types/user";


export const getUsers = async (): Promise<UsersResponse> => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};


export const getUser = async (
  id: string
): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};