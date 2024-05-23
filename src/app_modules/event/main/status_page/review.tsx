"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Box, Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";
import { useShallowEffect } from "@mantine/hooks";
import { Event_getListByStatusId } from "../../fun/get/get_list_event_by_status_id";
import ComponentEvent_IsEmptyData from "../../component/is_empty_data";

export default function Event_StatusReview({
  listReview,
  authorId,
}: {
  listReview: MODEL_EVENT[];
  authorId: string;
}) {
  const router = useRouter();


 if (_.isEmpty(listReview))
    return <ComponentEvent_IsEmptyData text="Tidak ada data"/>
  return (
    <>
      {listReview.map((e, i) => (
        <Box key={e.id}>
          <ComponentEvent_BoxListStatus
            data={e}
            path={RouterEvent.detail_review}
          />
        </Box>
      ))}
    </>
  );
}
