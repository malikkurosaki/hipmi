
import { Admin_LayoutKonfirmasiInvestasi } from "@/app_modules/admin/investasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Admin_LayoutKonfirmasiInvestasi>
        {children}
      </Admin_LayoutKonfirmasiInvestasi>
    </>
  );
}
