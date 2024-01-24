
import { LayoutEvent_DetailDraft } from "@/app_modules/event";
import React from "react";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutEvent_DetailDraft>{children}</LayoutEvent_DetailDraft>;
}
