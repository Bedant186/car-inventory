import { VehicleService } from "./VehicleService";
import { InMemoryVehicleRepository } from "../repositories/InMemoryVehicleRepository";
describe("VehicleService", () => {
    let vehicleService;
    let repo;
    beforeEach(() => {
        repo = new InMemoryVehicleRepository();
        vehicleService = new VehicleService(repo);
    });
    test("should add a new vehicle successfully", async () => {
        const vehicle = await vehicleService.addVehicle({
            make: "Toyota",
            model: "Camry",
            year: 2024,
            price: 25000,
            quantity: 5,
            category: "Sedan",
        });
        expect(vehicle.id).toBeDefined();
        expect(vehicle.make).toBe("Toyota");
    });
});
//# sourceMappingURL=VehicleService.test.js.map