import { LayoutListKabarDonasi } from "@/app_modules/donasi";
import React from "react";

export default async function Layput({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutListKabarDonasi>{children}</LayoutListKabarDonasi>
    </>
  );
}
