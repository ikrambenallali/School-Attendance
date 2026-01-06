import { Request, Response } from "express";
import * as attendanceService from "../services/attendance.service";
import prisma from "../lib/prisma";
import { CreateAttendanceDTO } from "../dtos/attendance.dto";
import { AttendanceStatus } from "@prisma/client";

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const { sessionId, attendances } = req.body as CreateAttendanceDTO;

  

    if (!sessionId || !Array.isArray(attendances) || attendances.length === 0) {
      return res.status(400).json({
        message: "sessionId et attendances requis",
      });
    }


    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        class: {
          include: { students: true },
        },
      },
    });

    if (!session) {
      return res.status(404).json({ message: "Séance inexistante" });
    }

    const classStudentIds = session.class.students.map((s) => s.id);


    for (const attendance of attendances) {
      if (
        !attendance.studentId ||
        !Object.values(AttendanceStatus).includes(attendance.status)
      ) {
        return res.status(400).json({
          message: "Données de présence invalides",
        });
      }

      if (!classStudentIds.includes(attendance.studentId)) {
        return res.status(400).json({
          message: `L'élève ${attendance.studentId} n'appartient pas à cette classe`,
        });
      }
    }


  const createdAttendances = await prisma.$transaction(
  attendances.map((a) =>
    prisma.attendance.upsert({
      where: {
        // 🔹 Assurez-vous d’avoir un index unique sur sessionId + studentId
        sessionId_studentId: {
          sessionId: sessionId,
          studentId: a.studentId,
        },
      },
      update: {
        status: a.status,
      },
      create: {
        sessionId,
        studentId: a.studentId,
        status: a.status,
      },
    })
  )
);


    res.status(201).json(createdAttendances);
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Présence déjà enregistrée pour cette séance",
      });
    }

    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAttendanceBySession = async (req: Request, res: Response) => {
  try {
console.log("req.params.sessionId:", req.params.sessionId);
const sessionId = Number(req.params.sessionId);
console.log("sessionId après Number():", sessionId);
    console.log("sessionId reçu:", sessionId);

    if (isNaN(sessionId)) {
      return res.status(400).json({ message: "sessionId invalide" });
    }

    //  Récupérer la session et sa classe avec les étudiants
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        class: {
          include: { students: true }
        }
      }
    });

    if (!session) {
      return res.status(404).json({ message: "Session non trouvée" });
    }

    //  Récupérer les présences pour cette session
    const attendances = await prisma.attendance.findMany({
      where: { sessionId },
      include: {
        student: true
      }
    });

    return res.json(attendances);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


export const getAttendanceByStudent = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.studentId);

    if (isNaN(studentId)) {
      return res.status(400).json({ message: "ID élève invalide" });
    }

    const attendances = await prisma.attendance.findMany({
      where: { studentId },
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true },
        },
        session: {
          include: {
            class: { select: { id: true, name: true } },
            subject: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const getAttendanceByClass = async (req: Request, res: Response) => {
  try {
    const classId = Number(req.params.classId);

    if (isNaN(classId)) {
      return res.status(400).json({ message: "ID classe invalide" });
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        session: {
          classId,
        },
      },
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true },
        },
        session: {
          include: {
            class: { select: { id: true, name: true } },
            subject: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: {
        session: { date: "desc" },
      },
    });

    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const getAttendanceByPeriod = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        message: "Paramètres start et end requis",
      });
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Dates invalides" });
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        session: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      include: {
        student: {
          select: { id: true, firstName: true, lastName: true },
        },
        session: {
          include: {
            class: { select: { id: true, name: true } },
            subject: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: {
        session: { date: "asc" },
      },
    });

    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


