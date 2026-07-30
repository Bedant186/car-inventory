export class VehicleService {
    vehicleRepository;
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async getAllVehicles() {
        return await this.vehicleRepository.findAll();
    }
    async searchVehicles(params) {
        return await this.vehicleRepository.search(params);
    }
    // src/services/VehicleService.ts
    async addVehicle(data) {
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
    async updateVehicle(id, data) {
        const existing = await this.vehicleRepository.findById(id);
        if (!existing) {
            throw new Error("Vehicle not found");
        }
        return await this.vehicleRepository.update(id, data);
    }
    async deleteVehicle(id) {
        const existing = await this.vehicleRepository.findById(id);
        if (!existing) {
            throw new Error("Vehicle not found");
        }
        return await this.vehicleRepository.delete(id);
    }
    async purchaseVehicle(id) {
        const vehicle = await this.vehicleRepository.findById(id);
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        if (vehicle.quantity <= 0) {
            throw new Error("Vehicle is out of stock");
        }
        return await this.vehicleRepository.update(id, { quantity: vehicle.quantity - 1 });
    }
    async restockVehicle(id, amount = 1) {
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
//# sourceMappingURL=VehicleService.js.map