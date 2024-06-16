"use client";

import { Text } from "@mantine/core";
import moment from "moment";

export default function ComponentDonasi_TampilanHitungMundur({
  durasi,
  publishTime,
  textSize,
}: {
  durasi: any;
  publishTime: any;
  textSize?: number
}) {
  return (
    <>
      <Text fz={textSize? textSize: "xs"}>
        Sisa hari{" "}
        <Text span inherit fw={"bold"}>
          {Number(durasi) -
            moment(new Date()).diff(new Date(publishTime), "days") <=
          0
            ? 0
            : Number(durasi) -
              moment(new Date()).diff(new Date(publishTime), "days")}
        </Text>{" "}
      </Text>
    </>
  );
}
