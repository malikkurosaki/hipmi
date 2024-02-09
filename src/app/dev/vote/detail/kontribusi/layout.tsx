import { LayoutVote_DetailKontribusi } from "@/app_modules/voting";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_DetailKontribusi>{children}</LayoutVote_DetailKontribusi>
    </>
  );
}
