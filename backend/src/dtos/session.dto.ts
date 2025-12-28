export interface CreateSessionDTO {
  date: string;       // "2025-01-02"
  startTime: string;  // "09:00"
  endTime: string;    // "11:00"
  classId: number;
  subjectId: number;
  teacherId: number;
}
