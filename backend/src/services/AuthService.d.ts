import type { UserRepository } from "../repositories/UserRepository.js";
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    register(email: string, password?: string, role?: "USER" | "ADMIN"): Promise<{
        user: {
            id: any;
            email: any;
            role: any;
        };
        token: string;
    }>;
    login(email: string, password?: string): Promise<{
        user: {
            id: any;
            email: any;
            role: any;
        };
        token: string;
    }>;
}
//# sourceMappingURL=AuthService.d.ts.map