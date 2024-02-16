"use client";

import { Button, Grid, Group, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import ComponentEvent_DetailData from "../../component/detail/detail_data";
import { MODEL_EVENT } from "../../model/interface";

export default function Event_DetailPublish({
  dataEvent,
}: {
  dataEvent: MODEL_EVENT;
}) {
  return (
    <>
      <ComponentEvent_DetailData data={dataEvent} />
    </>
  );
}
