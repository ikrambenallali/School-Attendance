// types/sidebar.ts
export type UserRole = "ADMIN" | "TEACHER";

export interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
