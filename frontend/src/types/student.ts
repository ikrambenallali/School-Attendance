export interface Class {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  classId: number;
  class: Class;
}

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
