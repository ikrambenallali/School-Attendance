import { AttendanceStatus } from "@prisma/client";

export interface AttendanceInput {
  studentId: number;
  status: AttendanceStatus;
}

export interface CreateAttendanceDTO {
  sessionId: number;
  attendances: AttendanceInput[];
}
