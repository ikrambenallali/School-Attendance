import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { LoginDTO } from "../types/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginDTO = req.body;

    // Validation minimale
    if (!data.email || !data.password) {
      console.log("Email ou mot de passe manquant:", req.body);
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    console.log("Request body:", req.body);

    // Appel unique au service
    const result = await authService.login(data);
    console.log("Login successful:", result);

    return res.status(200).json(result);
  } catch (error: any) {
    // Log détaillé de l'erreur
    console.error("Login error:", error.message || error);

    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
};
