"use client";

import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentJob_CardPreview from "../../component/card_preview";

export default function Job_Draft({ listDraft }: { listDraft: any }) {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={listDraft}
        path={RouterJob.detail_draft}
      />
    </>
  );
}
