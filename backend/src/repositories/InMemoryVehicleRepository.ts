import { Vehicle } from "../models/Vehicle";
import { VehicleRepository } from "./VehicleRepository";

export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles: Vehicle[] = [];

  async findAll(): Promise<Vehicle[]> {
    return this.vehicles;
  }

  async findById(id: number): Promise<Vehicle | null> {
    return this.vehicles.find((v) => v.id === id) || null;
  }

  async create(vehicleData: Omit<Vehicle, "id">): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      id: this.vehicles.length + 1,
      ...vehicleData,
    };
    this.vehicles.push(newVehicle);
    return newVehicle;
  }

  async update(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index === -1) throw new Error("Vehicle not found");
    this.vehicles[index] = { ...this.vehicles[index], ...vehicleData };
    return this.vehicles[index];
  }

  async delete(id: number): Promise<void> {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
  }
}
