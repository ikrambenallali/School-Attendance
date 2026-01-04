// types/class.types.ts

// Représente une classe telle qu'elle est stockée dans la DB
export interface Class {
  id: number;
  name: string;
  level: string;
  academicYear: string;
  createdAt: string;
}

// Pour créer une classe
export interface CreateClassDTO {
  name: string;
  level: string;
  academicYear: string;
}

// Pour mettre à jour une classe
export interface UpdateClassDTO {
  name?: string;
  level?: string;
  academicYear?: string;
}
