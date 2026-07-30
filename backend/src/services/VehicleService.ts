import type { VehicleRepository, VehicleSearchParams } from "../repositories/VehicleRepository.js";
import type { Vehicle } from "../models/Vehicle.js";

export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }

  async searchVehicles(params: VehicleSearchParams): Promise<Vehicle[]> {
    return await this.vehicleRepository.search(params);
  }

  // src/services/VehicleService.ts

async addVehicle(data: Omit<Vehicle, "id">): Promise<Vehicle> {
  if (!data.make || !data.model || !data.category) {
    throw new Error("Make, model, and category are required");
  }

  // Price validation for INR (e.g., must be a positive number)
  if (data.price <= 0) {
    throw new Error("Price in INR must be greater than zero");
  }
  if (data.quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }

  return await this.vehicleRepository.create(data);
}

  async updateVehicle(id: number, data: Partial<Omit<Vehicle, "id">>): Promise<Vehicle> {
    const existing = await this.vehicleRepository.findById(id);
    if (!existing) {
      throw new Error("Vehicle not found");
    }
    return await this.vehicleRepository.update(id, data);
  }

  async deleteVehicle(id: number): Promise<Vehicle> {
    const existing = await this.vehicleRepository.findById(id);
    if (!existing) {
      throw new Error("Vehicle not found");
    }
    return await this.vehicleRepository.delete(id);
  }

  async purchaseVehicle(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    if (vehicle.quantity <= 0) {
      throw new Error("Vehicle is out of stock");
    }
    return await this.vehicleRepository.update(id, { quantity: vehicle.quantity - 1 });
  }

  async restockVehicle(id: number, amount: number = 1): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    if (amount <= 0) {
      throw new Error("Restock amount must be greater than zero");
    }
    return await this.vehicleRepository.update(id, { quantity: vehicle.quantity + amount });
  }
}
