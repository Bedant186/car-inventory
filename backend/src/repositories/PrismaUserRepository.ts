import { PrismaClient } from "@prisma/client";
import type { UserRepository } from "./UserRepository.js";
import type { User } from "../models/User.js";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      ...user,
      role: user.role as 'ADMIN' | 'USER',
    };
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      ...user,
      role: user.role as 'ADMIN' | 'USER',
    };
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password!,
        role: userData.role || "USER",
      },
    });

    return {
      ...createdUser,
      role: createdUser.role as 'ADMIN' | 'USER',
    };
  }
}
