import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { CreateStudentDTO, UpdateStudentDTO } from "../types/student.types";

export const studentController = {
  // GET /api/students
  async getAll(req: Request, res: Response) {
    const students = await prisma.student.findMany({
      include: {
        class: true,
      },
    });

    res.json(students);
  },

  // GET /api/students/:id
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id },
      include: { class: true },
    });

    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res.json(student);
  },

  // POST /api/students
  async create(req: Request, res: Response) {
    const { firstName, lastName, email, classId } =
      req.body as CreateStudentDTO;

    if (!firstName || !lastName || !classId) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    // Vérifier que la classe existe
    const classe = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classe) {
      return res.status(400).json({ message: "Classe inexistante" });
    }

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        classId,
      },
    });

    res.status(201).json(student);
  },

  // PUT /api/students/:id
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body as UpdateStudentDTO;

    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    if (data.classId) {
      const classe = await prisma.class.findUnique({
        where: { id: data.classId },
      });

      if (!classe) {
        return res.status(400).json({ message: "Classe inexistante" });
      }
    }

    const updated = await prisma.student.update({
      where: { id },
      data,
    });

    res.json(updated);
  },

  // DELETE /api/students/:id
  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);

    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    await prisma.student.delete({ where: { id } });

    res.status(204).send();
  },
};
