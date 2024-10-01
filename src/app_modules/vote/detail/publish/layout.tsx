"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";
import { Voting_ComponentLayoutHeaderDetailPublish } from "../../component";

export default function LayoutVote_DetailPublish({
  children,
  votingId,
  userLoginId,
  dataVoting,
}: {
  children: React.ReactNode;
  votingId: string;
  userLoginId: string;
  dataVoting: any;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <Voting_ComponentLayoutHeaderDetailPublish
            dataVoting={dataVoting}
            title="Detail Publish"
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
