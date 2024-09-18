import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { user_funGetOneUserId } from "@/app_modules/fun_global";
import { LayoutVote_DetailPublish } from "@/app_modules/vote";
import { Voting_funGetOneVotingbyId } from "@/app_modules/vote/fun/get";
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
  if (!userLoginId) return <CheckCookies_UiView />;

  const dataVoting = await Voting_funGetOneVotingbyId(votingId);
  const authorId = dataVoting?.authorId;

  return (
    <>
      <LayoutVote_DetailPublish votingId={votingId} userLoginId={userLoginId}>
        {children}
      </LayoutVote_DetailPublish>
    </>
  );
}
