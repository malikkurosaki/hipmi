"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Box, Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";
import ComponentEvent_IsEmptyData from "../../component/is_empty_data";

export default function Event_StatusDraft({
  listDraft,
}: {
  listDraft: MODEL_EVENT[];
}) {
  if (_.isEmpty(listDraft))
    return <ComponentEvent_IsEmptyData text="Tidak ada data" />;
  return (
    <>
      {listDraft.map((e, i) => (
        <Box key={e.id}>
          <ComponentEvent_BoxListStatus
            data={e}
            path={RouterEvent.detail_draft}
          />
        </Box>
      ))}
    </>
  );
}
