import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  prisma  from "../lib/prisma";
import { LoginDTO, AuthResponse } from "../types/auth";

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  console.log("hi");
  
  const { email, password } = data;
  
  // const allUsers = await prisma.user.findMany();
  // console.log("all uesers",allUsers);

  const user = await prisma.user.findUnique({ where: { email } });
  
  console.log("USER FROM DB =", user);

  if (!user) {
    console.log("User not found!");
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("PASSWORD VALID ?", isPasswordValid);

  if (!isPasswordValid) {
    console.log("Password invalid!");
    throw new Error("Invalid credentials");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

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
