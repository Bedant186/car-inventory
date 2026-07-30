import { Vehicle } from "../models/Vehicle";
import { VehicleRepository } from "./VehicleRepository";
export class InMemoryVehicleRepository {
    vehicles = [];
    async findAll() {
        return this.vehicles;
    }
    async findById(id) {
        return this.vehicles.find((v) => v.id === id) || null;
    }
    async create(vehicleData) {
        const newVehicle = {
            id: this.vehicles.length + 1,
            ...vehicleData,
        };
        this.vehicles.push(newVehicle);
        return newVehicle;
    }
    async update(id, vehicleData) {
        const index = this.vehicles.findIndex((v) => v.id === id);
        if (index === -1)
            throw new Error("Vehicle not found");
        this.vehicles[index] = { ...this.vehicles[index], ...vehicleData };
        return this.vehicles[index];
    }
    async delete(id) {
        this.vehicles = this.vehicles.filter((v) => v.id !== id);
    }
}
//# sourceMappingURL=InMemoryVehicleRepository.js.map