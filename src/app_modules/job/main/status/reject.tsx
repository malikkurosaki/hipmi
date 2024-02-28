"use client";

import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { MODEL_JOB } from "../../model/interface";

export default function Job_Reject({ listReject }: { listReject : MODEL_JOB[]}) {
  return (
    <>
      <ComponentJob_CardViewStatus listData={listReject} path={RouterJob.detail_reject} />
    </>
  );
}
