import { Vehicle } from "../models/Vehicle";
import { VehicleRepository } from "./VehicleRepository";
export declare class InMemoryVehicleRepository implements VehicleRepository {
    private vehicles;
    findAll(): Promise<Vehicle[]>;
    findById(id: number): Promise<Vehicle | null>;
    create(vehicleData: Omit<Vehicle, "id">): Promise<Vehicle>;
    update(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=InMemoryVehicleRepository.d.ts.map