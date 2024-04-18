import { LayoutColab_MainDetail } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const colabId = params.id;
  return (
    <>
      <LayoutColab_MainDetail colabId={colabId}>
        {children}
      </LayoutColab_MainDetail>
    </>
  );
}
