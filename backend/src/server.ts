import app from "./app.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository.js";
import { AuthService } from "./services/AuthService.js";
import { AuthController } from "./controllers/AuthController.js";
import { createAuthRoutes } from "./routes/authRoutes.js";

const repository = new PrismaUserRepository();

const authService = new AuthService(repository);

const authController = new AuthController(authService);

app.use(createAuthRoutes(authController));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
