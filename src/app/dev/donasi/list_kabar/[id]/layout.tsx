import { LayoutListKabarDonasi } from "@/app_modules/donasi";
import React from "react";

export default async function Layput({
  children,
  params
}: {
  children: React.ReactNode;
  params: {id: string}
}) {
  return (
    <>
      <LayoutListKabarDonasi>{children}</LayoutListKabarDonasi>
    </>
  );
}
