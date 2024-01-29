"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Box, Center, Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_EVENT } from "../../model/interface";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import _ from "lodash";

export default function Event_StatusPublish({
  listPublish,
}: {
  listPublish: MODEL_EVENT[];
}) {
  const router = useRouter();

  if (_.isEmpty(listPublish))
    return (
      <Center h={"50vh"} fz={"sm"} fw={"bold"}>
        Tidak Ada Event
      </Center>
    );

  return (
    <>
      {listPublish
        .map((e, i) => (
         <Box key={e.id}>
          <ComponentEvent_BoxListStatus data={e} path={RouterEvent.detail_publish}/>

         </Box>
        ))}
    </>
  );
}
