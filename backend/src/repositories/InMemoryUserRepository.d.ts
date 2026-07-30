import type { User } from "../models/User";
import { UserRepository } from "./UserRepository";
export declare class InMemoryUserRepository implements UserRepository {
    private users;
    findByEmail(email: string): User | undefined;
    create(user: User): User;
}
//# sourceMappingURL=InMemoryUserRepository.d.ts.map