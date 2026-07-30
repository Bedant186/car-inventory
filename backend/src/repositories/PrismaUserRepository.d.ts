import type { UserRepository } from "./UserRepository.js";
import type { User } from "../models/User.js";
export declare class PrismaUserRepository implements UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(userData: Omit<User, "id">): Promise<User>;
}
//# sourceMappingURL=PrismaUserRepository.d.ts.map