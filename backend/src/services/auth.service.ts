import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { LoginDTO, AuthResponse } from "../types/auth";

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const { email, password } = data;

  // Cherche l'utilisateur par email
  
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Vérifie le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Génère le token JWT
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
