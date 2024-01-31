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
import { Event_getByStatusId } from "../../fun/get/get_event_by_status_id";

export default function Event_StatusReview({
  listReview,
  authorId,
}: {
  listReview: MODEL_EVENT[];
  authorId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState(listReview);

  useShallowEffect(() => {
   setTimeout(() =>  loadData(authorId), 1000)
  }, []);

  async function loadData(authorId: string) {
    const res : any = await Event_getByStatusId("2", authorId);
    setData(res);
  }

  if (_.isEmpty(data))
    return (
      <Center h={"50vh"} fz={"sm"} fw={"bold"}>
        Tidak Ada Event
      </Center>
    );
  return (
    <>
      {data.map((e, i) => (
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
