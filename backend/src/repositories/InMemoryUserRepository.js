import { UserRepository } from "./UserRepository";
export class InMemoryUserRepository {
    users = [];
    findByEmail(email) {
        return this.users.find((user) => user.email == email);
    }
    create(user) {
        this.users.push(user);
        return user;
    }
}
//# sourceMappingURL=InMemoryUserRepository.js.map