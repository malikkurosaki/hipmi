"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Box, Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";
import ComponentEvent_IsEmptyData from "../../component/is_empty_data";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/_global/loading_card";

export default function Event_StatusPublish({
  listPublish,
}: {
  listPublish: MODEL_EVENT[];
}) {
  const router = useRouter();
  

  if (_.isEmpty(listPublish))
    return <ComponentEvent_IsEmptyData text="Tidak ada data" />;

  return (
    <>
      {listPublish.map((e, i) => (
        <Box key={e.id}>
          <Box>
            <ComponentEvent_BoxListStatus
              data={e}
              path={RouterEvent.detail_publish}
             
            />
            {/* {visible && e?.id === eventId ? (
              <ComponentGlobal_CardLoadingOverlay />
            ) : (
              ""
            )} */}
          </Box>
        </Box>
      ))}
    </>
  );
}
