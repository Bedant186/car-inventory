import type { User } from "../models/User.js";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(user: Omit<User, "id">): Promise<User>;
}
