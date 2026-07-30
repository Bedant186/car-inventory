import type { Vehicle } from "../models/Vehicle.js";

export interface VehicleSearchParams {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface VehicleRepository {
  findAll(): Promise<Vehicle[]>;
  findById(id: number): Promise<Vehicle | null>;
  search(params: VehicleSearchParams): Promise<Vehicle[]>;
  create(data: Omit<Vehicle, "id">): Promise<Vehicle>;
  update(id: number, data: Partial<Omit<Vehicle, "id">>): Promise<Vehicle>;
  delete(id: number): Promise<Vehicle>;
}
