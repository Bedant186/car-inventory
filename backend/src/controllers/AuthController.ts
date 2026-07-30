import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const result = await this.authService.register(email, password, role);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message || "Authentication failed" });
    }
  }
}
