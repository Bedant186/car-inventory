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

// 1. Configure CORS dynamic origins & credentials
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL // Ensure your Vercel URL is added here in Render Env Vars
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked this request"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Explicitly answer OPTIONS preflight requests globally
app.options("*", cors());

// 2. Parse JSON payloads after CORS initialization
app.use(express.json());

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
