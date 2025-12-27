export interface CreateStudentDTO {
  firstName: string;
  lastName: string;
  email?: string;
  classId: number;
}

export interface UpdateStudentDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  classId?: number;
}
