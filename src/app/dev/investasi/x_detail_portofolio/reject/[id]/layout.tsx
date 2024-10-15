import { LayoutDetailRejectInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <LayoutDetailRejectInvestasi idInves={params.id}>
        {children}
      </LayoutDetailRejectInvestasi>
    </>
  );
}
