import { LayoutStatusTransaksiInvestasi_Gagal } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutStatusTransaksiInvestasi_Gagal>
        {children}
      </LayoutStatusTransaksiInvestasi_Gagal>
    </>
  );
}
