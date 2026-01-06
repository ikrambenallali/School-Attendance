import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../types/user.type";

export const roles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
};