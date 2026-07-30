import { Router } from "express";
export function createAuthRoutes(authController) {
    const router = Router();
    router.post("/register", (req, res) => authController.register(req, res));
    router.post("/login", (req, res) => authController.login(req, res));
    return router;
}
//# sourceMappingURL=authRoutes.js.map