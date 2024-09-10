"use client";

import { Investasi_ViewPortofolio } from "../../_view";
export function Investasi_UiPortofolio({
  listStatus,
  listDataPublish,
  listDataReview,
  listDataDraft,
  listDataReject,
}: {
  listStatus: any[];
  listDataPublish: any[];
  listDataReview: any[];
  listDataDraft: any[];
  listDataReject: any[];
}) {
  return (
    <>
      <Investasi_ViewPortofolio
        listStatus={listStatus}
        listDataPublish={listDataPublish}
        listDataReview={listDataReview}
        listDataDraft={listDataDraft}
        listDataReject={listDataReject}
      />
    </>
  );
}
