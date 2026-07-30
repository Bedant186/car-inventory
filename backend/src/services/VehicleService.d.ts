import type { VehicleRepository, VehicleSearchParams } from "../repositories/VehicleRepository.js";
import type { Vehicle } from "../models/Vehicle.js";
export declare class VehicleService {
    private vehicleRepository;
    constructor(vehicleRepository: VehicleRepository);
    getAllVehicles(): Promise<Vehicle[]>;
    searchVehicles(params: VehicleSearchParams): Promise<Vehicle[]>;
    addVehicle(data: Omit<Vehicle, "id">): Promise<Vehicle>;
    updateVehicle(id: number, data: Partial<Omit<Vehicle, "id">>): Promise<Vehicle>;
    deleteVehicle(id: number): Promise<Vehicle>;
    purchaseVehicle(id: number): Promise<Vehicle>;
    restockVehicle(id: number, amount?: number): Promise<Vehicle>;
}
//# sourceMappingURL=VehicleService.d.ts.map