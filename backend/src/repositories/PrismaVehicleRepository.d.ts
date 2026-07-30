import type { VehicleRepository, VehicleSearchParams } from "./VehicleRepository.js";
import type { Vehicle } from "../models/Vehicle.js";
export declare class PrismaVehicleRepository implements VehicleRepository {
    findAll(): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | null>;
    search(params: VehicleSearchParams): Promise<Vehicle[]>;
    create(data: Omit<Vehicle, "id">): Promise<Vehicle>;
    update(id: number, data: Partial<Omit<Vehicle, "id">>): Promise<Vehicle>;
    delete(id: number): Promise<Vehicle>;
}
//# sourceMappingURL=PrismaVehicleRepository.d.ts.map