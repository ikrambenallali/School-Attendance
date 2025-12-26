import { Request, Response } from 'express';
import {prisma} from '../config/db';
import bcrypt from 'bcryptjs';

/**
 * GET /api/users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  res.json(users);
};

/**
 * GET /api/users/:id
 */
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

/**
 * POST /api/users
 */
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  res.status(201).json(user);
};

/**
 * PUT /api/users/:id
 */
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email, role, status } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { name, email, role, status },
  });

  res.json(user);
};

/**
 * DELETE /api/users/:id
 */
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.user.delete({ where: { id } });

  res.json({ message: 'User deleted successfully' });
};
