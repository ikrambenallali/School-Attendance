import prisma from "../lib/prisma";
import { CreateSessionDTO } from "../dtos/session.dto";

export const createSession = async (data: CreateSessionDTO) => {
  const classe = await prisma.class.findUnique({
    where: { id: data.classId }
  });
  if (!classe) throw new Error("Class not found");

  const subject = await prisma.subject.findUnique({
    where: { id: data.subjectId }
  });
  if (!subject) throw new Error("Subject not found");

  const teacher = await prisma.user.findUnique({
    where: { id: data.teacherId }
  });
  if (!teacher) throw new Error("Teacher not found");

  return prisma.session.create({
    data: {
      date: new Date(data.date),
      startTime: new Date(`${data.date}T${data.startTime}`),
      endTime: new Date(`${data.date}T${data.endTime}`),
      classId: data.classId,
      subjectId: data.subjectId,
      teacherId: data.teacherId
    }
  });
};
export const getSessions = async () => {
  return prisma.session.findMany({
    include: {
      class: true,
      subject: true,
      teacher: true
    }
  });
};

