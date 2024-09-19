import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { CheckCookies_UiView } from "@/app_modules/check_cookies";
import { LayoutVote_DetailSemuaRiwayat } from "@/app_modules/vote";
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

  if (!userLoginId) return <CheckCookies_UiView />;

  return (
    <>
      <LayoutVote_DetailSemuaRiwayat
        votingId={votingId}
        userLoginId={userLoginId}
      >
        {children}
      </LayoutVote_DetailSemuaRiwayat>
    </>
  );
}
