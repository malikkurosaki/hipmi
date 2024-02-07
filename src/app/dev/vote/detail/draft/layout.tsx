import { LayoutVote_DetailDraft } from "@/app_modules/vote";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutVote_DetailDraft>{children}</LayoutVote_DetailDraft>
    </>
  );
}
