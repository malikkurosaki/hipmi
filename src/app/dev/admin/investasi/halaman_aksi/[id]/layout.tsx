
import { Admin_LayoutHalamanAksi } from "@/app_modules/admin/investasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Admin_LayoutHalamanAksi>{children}</Admin_LayoutHalamanAksi>
    </>
  );
}
