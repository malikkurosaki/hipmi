import { LayoutJob_Main } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_Main>{children}</LayoutJob_Main>
    </>
  );
}
