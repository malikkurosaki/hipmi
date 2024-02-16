import { LayoutVote_Main } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_Main>{children}</LayoutVote_Main>
    </>
  );
}
