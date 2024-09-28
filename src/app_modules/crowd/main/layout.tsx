"use client";

import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import ComponentGlobal_HeaderTamplate from "@/app_modules/_global/header_tamplate";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutMainCrowd({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppComponentGlobal_LayoutTamplate
        header={
          <ComponentGlobal_HeaderTamplate
            route="/dev/home"
            title="HIPMI Crowd Funding"
          />
        }
      >
        {children}
      </AppComponentGlobal_LayoutTamplate>
    </>
  );
}
