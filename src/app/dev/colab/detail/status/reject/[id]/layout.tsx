import { LayoutColab_DetailStatusReject } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_DetailStatusReject>
        {children}
      </LayoutColab_DetailStatusReject>
    </>
  );
}
