"use client";

import ComponentJob_CardViewStatus from "../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { MODEL_JOB } from "../model/interface";

export default function Job_Arsip({ dataJob }: { dataJob: MODEL_JOB[] }) {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={dataJob}
        path={RouterJob.detail_arsip}
      />
    </>
  );
}
