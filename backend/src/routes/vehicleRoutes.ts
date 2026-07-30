import { Router } from "express";
import type { VehicleController } from "../controllers/VehicleController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

export function createVehicleRoutes(vehicleController: VehicleController): Router {
  const router = Router();

  // Protected vehicle endpoints
  router.get("/", authenticateToken, (req, res) => vehicleController.getAll(req, res));
  router.get("/search", authenticateToken, (req, res) => vehicleController.search(req, res));
  router.post("/", authenticateToken, (req, res) => vehicleController.add(req, res));
  router.put("/:id", authenticateToken, (req, res) => vehicleController.update(req, res));

  // Protected Admin-only endpoints
  router.delete("/:id", authenticateToken, requireAdmin, (req, res) => vehicleController.delete(req, res));

  // Inventory actions
  router.post("/:id/purchase", authenticateToken, (req, res) => vehicleController.purchase(req, res));
  router.post("/:id/restock", authenticateToken, requireAdmin, (req, res) => vehicleController.restock(req, res));

  return router;
}
