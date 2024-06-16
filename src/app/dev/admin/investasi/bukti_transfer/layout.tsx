import { Admin_LayoutBuktiTransferInvestasi } from "@/app_modules/admin/investasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Admin_LayoutBuktiTransferInvestasi>
        {children}
      </Admin_LayoutBuktiTransferInvestasi>
    </>
  );
}
