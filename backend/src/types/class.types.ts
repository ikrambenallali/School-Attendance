export interface Class {
  id: number;
  name: string;
  level: string;
  academicYear: string;
  createdAt: Date;
}

export interface CreateClassDTO {
  name: string;
  level: string;
  academicYear: string;
}

export interface UpdateClassDTO {
  name?: string;
  level?: string;
  academicYear?: string;
}
