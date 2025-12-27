import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CreateClassDTO, UpdateClassDTO } from "../types/class.types";

export const classController = {
  // GET /api/classes
  async getAll(req: Request, res: Response) {
    const classes = await prisma.class.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(classes);
  },

  // GET /api/classes/:id
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    const classe = await prisma.class.findUnique({
      where: { id },
    });

    if (!classe) {
      return res.status(404).json({ message: "Classe non trouvée" });
    }

    res.json(classe);
  },

  // POST /api/classes
  async create(req: Request, res: Response) {
    const { name, level, academicYear } = req.body as CreateClassDTO;

    if (!name || !level || !academicYear) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const classe = await prisma.class.create({
      data: { name, level, academicYear },
    });

    res.status(201).json(classe);
  },

  // PUT /api/classes/:id
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body as UpdateClassDTO;

    const existing = await prisma.class.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Classe non trouvée" });
    }

    const updated = await prisma.class.update({
      where: { id },
      data,
    });

    res.json(updated);
  },

  // DELETE /api/classes/:id
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    const existing = await prisma.class.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Classe non trouvée" });
    }

    await prisma.class.delete({ where: { id } });

    res.status(204).json({message:"class deleted"});
  },
};
