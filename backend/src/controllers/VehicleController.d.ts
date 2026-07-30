import type { Request, Response } from "express";
import type { VehicleService } from "../services/VehicleService.js";
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    search(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    add(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    purchase(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    restock(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=VehicleController.d.ts.map