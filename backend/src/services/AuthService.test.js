import { describe, it, expect } from "vitest";
import { AuthService } from "./AuthService";
import { InMemoryUserRepository } from "../repositories/InMemoryUserRepository";
describe("AuthService", () => {
    it("should register a user with valid email and password", () => {
        const service = new AuthService();
        const user = service.register("bedant@gmail.com", "password123");
        expect(user.email).toBe("bedant@gmail.com");
    });
});
//# sourceMappingURL=AuthService.test.js.map