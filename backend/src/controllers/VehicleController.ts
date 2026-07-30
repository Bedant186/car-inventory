import type { Request, Response } from "express";
import type { VehicleService } from "../services/VehicleService.js";

export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  async getAll(req: Request, res: Response) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      return res.status(200).json(vehicles);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { make, model, category, minPrice, maxPrice } = req.query;
      const vehicles = await this.vehicleService.searchVehicles({
        make: make ? String(make) : undefined,
        model: model ? String(model) : undefined,
        category: category ? String(category) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      return res.status(200).json(vehicles);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async add(req: Request, res: Response) {
    try {
      const { make, model, category, price, quantity } = req.body;
      const vehicle = await this.vehicleService.addVehicle({
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });
      return res.status(201).json(vehicle);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const vehicle = await this.vehicleService.updateVehicle(id, req.body);
      return res.status(200).json(vehicle);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.vehicleService.deleteVehicle(id);
      return res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async purchase(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const vehicle = await this.vehicleService.purchaseVehicle(id);
      return res.status(200).json(vehicle);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async restock(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const amount = req.body.amount ? Number(req.body.amount) : 1;
      const vehicle = await this.vehicleService.restockVehicle(id, amount);
      return res.status(200).json(vehicle);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
