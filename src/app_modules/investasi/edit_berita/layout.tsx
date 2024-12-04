"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import React from "react";

export default function LayoutEditBeritaInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Berita" />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
