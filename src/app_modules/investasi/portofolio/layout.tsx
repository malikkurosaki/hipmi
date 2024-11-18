"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import React, { useState } from "react";

export default function LayoutPortofolioInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <AppComponentGlobal_LayoutTamplate>
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
