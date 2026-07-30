import { PrismaClient } from "@prisma/client";
import type { UserRepository } from "./UserRepository.js";
import type { User } from "../models/User.js";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password!,
        role: userData.role || "USER",
      },
    });
  }
}
