import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
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
  const userLoginId = await funGetUserIdByToken();

  const dataVoting = await Voting_funGetOneVotingbyId(votingId);

  return (
    <>
      <LayoutVote_DetailPublish votingId={votingId} userLoginId={userLoginId}>
        {children}
      </LayoutVote_DetailPublish>
    </>
  );
}
