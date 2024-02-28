"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentJob_CardPreview from "../component/card_preview";
import { MODEL_JOB } from "../model/interface";

export default function Job_Arsip({ dataJob }: { dataJob :MODEL_JOB[]}) {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={dataJob}
        path={RouterJob.detail_arsip}
      />
    </>
  );
}


