"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Voting_ViewDetailKontributorVoting } from "../../_view";

export function Voting_UiDetailKontributorVoting({
  listKontributor,
}: {
  listKontributor: any[];
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Kontributor" />}
      >
        <Voting_ViewDetailKontributorVoting listKontributor={listKontributor} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
