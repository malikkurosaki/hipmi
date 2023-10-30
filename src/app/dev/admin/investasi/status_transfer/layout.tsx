import { Admin_LayoutStatusTransferInvesatasi } from "@/app_modules/admin/investasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Admin_LayoutStatusTransferInvesatasi>
        {children}
      </Admin_LayoutStatusTransferInvesatasi>
    </>
  );
}
