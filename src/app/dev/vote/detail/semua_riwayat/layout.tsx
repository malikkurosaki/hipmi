import { LayoutVote_DetailSemuaRiwayat } from "@/app_modules/voting";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_DetailSemuaRiwayat>{children}</LayoutVote_DetailSemuaRiwayat>
    </>
  );
}
