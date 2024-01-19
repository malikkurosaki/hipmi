import { AdminLayout } from "@/app_modules/admin/main_dashboard";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
