"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import ComponentJob_CardViewStatus from "../../component/card_view_status";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import ComponentJob_CardPreview from "../../component/card_preview";
import { Job_getListStatusByStatusId } from "../../fun/get/get_list_status_by_status_id";

export default function Job_Publish({ listPublish }: { listPublish: any }) {
  return (
    <>
      <ComponentJob_CardViewStatus
        listData={listPublish}
        path={RouterJob.detail_publish}
      />
    </>
  );
}
