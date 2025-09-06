import { User } from "../types";

export const mockUsers: Record<number, User> = {
  1: { id: 1, name: "John Doe", email: "john@example.com" },
  2: { id: 2, name: "Jane Smith", email: "jane@example.com" },
  3: { id: 3, name: "Alice Johnson", email: "alice@example.com" },
};

let nextUserId = 4;

export const addUser = (name: string, email: string): User => {
  const newUser: User = {
    id: nextUserId++,
    name,
    email,
  };
  mockUsers[newUser.id] = newUser;
  return newUser;
};

export const getUserById = (id: number): User | undefined => {
  return mockUsers[id];
};
