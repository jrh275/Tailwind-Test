// source/app/(app)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <DashboardLayout currentPath={pathname}>{children}</DashboardLayout>;
}
