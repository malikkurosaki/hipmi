
import { LayoutColab_DetailStatusPublish } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_DetailStatusPublish>{children}</LayoutColab_DetailStatusPublish>
    </>
  );
}
