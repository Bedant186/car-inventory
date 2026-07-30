import app from "./app";

import { errorHandler } from "./middlewares/errorHandler";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository";
import { AuthService } from "./services/AuthService";
import { AuthController } from "./controllers/AuthController";
import { createAuthRoutes } from "./routes/authRoutes";

const repository = new PrismaUserRepository();

const authService = new AuthService(repository);

const authController = new AuthController(authService);

app.use(createAuthRoutes(authController));

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
