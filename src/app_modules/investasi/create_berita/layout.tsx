"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { useRouter } from "next/navigation";

import React from "react";

export default function LayoutCreateBeritaInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string;
}) {
  const router = useRouter();
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Buat Berita" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
