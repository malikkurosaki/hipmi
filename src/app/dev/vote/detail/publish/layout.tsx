import { LayoutVote_DetailPublish } from "@/app_modules/voting";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutVote_DetailPublish>{children}</LayoutVote_DetailPublish>
    </>
  );
}
