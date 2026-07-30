import express from "express";
import cors from "cors";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository.js";
import { PrismaVehicleRepository } from "./repositories/PrismaVehicleRepository.js";
import { AuthService } from "./services/AuthService.js";
import { VehicleService } from "./services/VehicleService.js";
import { AuthController } from "./controllers/AuthController.js";
import { VehicleController } from "./controllers/VehicleController.js";
import { createAuthRoutes } from "./routes/authRoutes.js";
import { createVehicleRoutes } from "./routes/vehicleRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
// Dependency Injection Assembly
const userRepository = new PrismaUserRepository();
const vehicleRepository = new PrismaVehicleRepository();
const authService = new AuthService(userRepository);
const vehicleService = new VehicleService(vehicleRepository);
const authController = new AuthController(authService);
const vehicleController = new VehicleController(vehicleService);
// Mount API Routes
app.use("/api/auth", createAuthRoutes(authController));
app.use("/api/vehicles", createVehicleRoutes(vehicleController));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
export default app;
//# sourceMappingURL=app.js.map