import { LayoutJob_DetailDraft } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_DetailDraft>{children}</LayoutJob_DetailDraft>
    </>
  );
}
