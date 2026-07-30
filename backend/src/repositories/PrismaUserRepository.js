import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class PrismaUserRepository {
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return await prisma.user.findUnique({ where: { id } });
    }
    async create(userData) {
        return await prisma.user.create({
            data: {
                email: userData.email,
                password: userData.password,
                role: userData.role || "USER",
            },
        });
    }
}
//# sourceMappingURL=PrismaUserRepository.js.map