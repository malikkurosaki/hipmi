"use client";

import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export default function Job_Reject() {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={[{ id: 1 }, { id: 2 }]}
        path={RouterJob.detail_reject}
      />
    </>
  );
}
