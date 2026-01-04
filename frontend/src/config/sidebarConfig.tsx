// config/sidebarConfig.tsx
import type { SidebarItem } from "../types/sidebar";
import { FaHome, FaUsers, FaBook, FaCalendarCheck } from "react-icons/fa";

export const sidebarConfig: Record<"ADMIN" | "TEACHER", SidebarItem[]> = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { label: "Classes", path: "/admin/classes", icon: <FaUsers /> },
    { label: "Étudiants", path: "/admin/students", icon: <FaUsers /> },
    { label: "Matières", path: "/admin/subjects", icon: <FaBook /> },
    { label: "Séances", path: "/admin/sessions", icon: <FaCalendarCheck /> },
    { label: "Présences", path: "/admin/attendance", icon: <FaCalendarCheck /> },
  ],

  TEACHER: [
    { label: "Dashboard", path: "/teacher/dashboard", icon: <FaHome /> },
    { label: "Mes séances", path: "/teacher/sessions", icon: <FaCalendarCheck /> },
    { label: "Saisie présence", path: "/teacher/attendance", icon: <FaCalendarCheck /> },
  ],
};
