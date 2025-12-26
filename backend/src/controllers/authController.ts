import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { LoginDTO } from "../types/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginDTO = req.body;

    // Validation minimale
    if (!data.email || !data.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await authService.login(data);
    
    return res.status(200).json(result);

  } catch (error: any) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
