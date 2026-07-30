import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class PrismaVehicleRepository {
    async findAll() {
        return await prisma.vehicle.findMany();
    }
    async findById(id) {
        return await prisma.vehicle.findUnique({ where: { id } });
    }
    // src/repositories/PrismaVehicleRepository.ts
    async search(params) {
        const whereClause = {};
        if (params.make)
            whereClause.make = { contains: params.make, mode: "insensitive" };
        if (params.model)
            whereClause.model = { contains: params.model, mode: "insensitive" };
        if (params.category)
            whereClause.category = { contains: params.category, mode: "insensitive" };
        // Filtering directly in INR values (e.g. 500000 to 2000000)
        if (params.minPrice !== undefined || params.maxPrice !== undefined) {
            whereClause.price = {};
            if (params.minPrice !== undefined)
                whereClause.price.gte = Number(params.minPrice);
            if (params.maxPrice !== undefined)
                whereClause.price.lte = Number(params.maxPrice);
        }
        return await prisma.vehicle.findMany({ where: whereClause });
    }
    async create(data) {
        return await prisma.vehicle.create({ data });
    }
    async update(id, data) {
        return await prisma.vehicle.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma.vehicle.delete({ where: { id } });
    }
}
//# sourceMappingURL=PrismaVehicleRepository.js.map