import prisma from "../lib/prisma";
import { CreateAttendanceDTO } from "../dtos/attendance.dto";

export const createAttendance = async (data: CreateAttendanceDTO) => {
  const { sessionId, attendances } = data;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { class: { include: { students: true } } }
  });
  if (!session) throw new Error("Session not found");

  const studentIds = session.class.students.map(s => s.id);
  for (const a of attendances) {
    if (!studentIds.includes(a.studentId)) {
      throw new Error(`Student ${a.studentId} is not in this class`);
    }
  }

  const results = [];
  for (const a of attendances) {
    const attendance = await prisma.attendance.upsert({
      where: { sessionId_studentId: { sessionId, studentId: a.studentId } },
      update: { status: a.status },
      create: { sessionId, studentId: a.studentId, status: a.status }
    });
    results.push(attendance);
  }

  return results;
};

export const getAttendanceBySession = async (sessionId: number) => {
  return prisma.attendance.findMany({
    where: { sessionId },
    include: {
      student: true
    }
  });
};
