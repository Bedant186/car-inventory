import type { Request, Response } from "express";
import type { AuthService } from "../services/AuthService.js";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=AuthController.d.ts.map