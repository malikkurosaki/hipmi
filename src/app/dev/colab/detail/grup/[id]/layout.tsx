import { LayoutColab_DetailGrupDiskusi } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_DetailGrupDiskusi>{children}</LayoutColab_DetailGrupDiskusi>
    </>
  );
}
