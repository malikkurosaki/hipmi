"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Box, Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";
import ComponentEvent_IsEmptyData from "../../component/is_empty_data";

export default function Event_StatusReject({
  listReject,
}: {
  listReject: MODEL_EVENT[];
}) {
  if (_.isEmpty(listReject))
    return <ComponentEvent_IsEmptyData text="Tidak ada data" />;
  return (
    <>
      {listReject.map((e, i) => (
        <Box key={e.id}>
          <ComponentEvent_BoxListStatus
            data={e}
            path={RouterEvent.detail_reject}
          />
        </Box>
      ))}
    </>
  );
}
