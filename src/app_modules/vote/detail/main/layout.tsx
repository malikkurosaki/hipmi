"use client";

import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";
import { Voting_ComponentLayoutHeaderDetailPublish } from "../../component";

export default function LayoutVote_MainDetail({
  children,
  votingId,
  userLoginId,
}: {
  children: React.ReactNode;
  votingId: string;
  userLoginId: string;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <Voting_ComponentLayoutHeaderDetailPublish
            title="Detail Voting"
            votingId={votingId}
            userLoginId={userLoginId}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
