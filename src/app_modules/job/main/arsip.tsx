"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";

export default function Job_Arsip() {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={[{ id: 1 }, { id: 2 }]}
        path={RouterJob.detail_arsip}
      />
    </>
  );
}
