import { user_funGetOneUserId } from "@/app_modules/fun_global";
import { LayoutVote_DetailKontribusi } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const votingId = params.id;
  const userLoginId = await user_funGetOneUserId();

  return (
    <>
      <LayoutVote_DetailKontribusi
        votingId={votingId}
        userLoginId={userLoginId}
      >
        {children}
      </LayoutVote_DetailKontribusi>
    </>
  );
}
