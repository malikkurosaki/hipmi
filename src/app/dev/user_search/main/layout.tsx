import { LayoutUserSearch_MainView } from "@/app_modules/user_search";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutUserSearch_MainView>{children}</LayoutUserSearch_MainView>;
}
