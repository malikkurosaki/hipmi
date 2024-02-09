"use client"

import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import ComponentVote_CardViewStatus from "../../component/card_view_status";

export default function Vote_StatusDraft() {
  return (
    <>
      <ComponentVote_CardViewStatus path={RouterVote.detail_draft} />
    </>
  );
}
