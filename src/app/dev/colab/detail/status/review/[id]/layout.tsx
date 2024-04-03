import { LayoutColab_DetailStatusReview } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_DetailStatusReview>
        {children}
      </LayoutColab_DetailStatusReview>
    </>
  );
}
