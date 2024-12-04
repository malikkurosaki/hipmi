"use client";

import ComponentGlobal_V2_LoadingPage from "@/app_modules/_global/loading_page_v2";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
export default function LayoutForum_Detail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Postingan" posotion={"left"} />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
