import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../types/subject.types";

export const subjectController = {
  // GET /api/subjects
  async getAll(req: Request, res: Response) {
    const subjects = await prisma.subject.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(subjects);
  },

  // GET /api/subjects/:id
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    const subject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }

    res.json(subject);
  },

  // POST /api/subjects
  async create(req: Request, res: Response) {
    const { name, code } = req.body as CreateSubjectDTO;

    if (!name || !code) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    // vérifier unicité du code
    const exists = await prisma.subject.findUnique({
      where: { code },
    });

    if (exists) {
      return res.status(400).json({ message: "Code déjà utilisé" });
    }

    const subject = await prisma.subject.create({
      data: { name, code },
    });

    res.status(201).json(subject);
  },

  // PUT /api/subjects/:id
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body as UpdateSubjectDTO;

    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }

    if (data.code) {
      const codeUsed = await prisma.subject.findUnique({
        where: { code: data.code },
      });

      if (codeUsed && codeUsed.id !== id) {
        return res.status(400).json({ message: "Code déjà utilisé" });
      }
    }

    const updated = await prisma.subject.update({
      where: { id },
      data,
    });

    res.json(updated);
  },

  // DELETE /api/subjects/:id
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    const existing = await prisma.subject.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }6

    await prisma.subject.delete({ where: { id } });

    res.status(204).send();
  },
};
