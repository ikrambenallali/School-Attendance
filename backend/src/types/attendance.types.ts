import { AttendanceStatus } from "@prisma/client";

export interface AttendanceResponse {
  id: number;
  status: AttendanceStatus;
  createdAt: Date;

  student: {
    id: number;
    firstName: string;
    lastName: string;
  };

  session: {
    id: number;
    date: Date;
    class: {
      id: number;
      name: string;
    };
    subject: {
      id: number;
      name: string;
    };
  };
}
export interface AttendanceInput {
  studentId: number;
  status: AttendanceStatus;
}

export interface CreateAttendanceDTO {
  sessionId: number;
  attendances: AttendanceInput[];
}
