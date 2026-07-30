import type { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Assuming user payload was attached to req.user by auth middleware
  const user = (req as any).user;

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }

  next();
};

export default requireAdmin;
