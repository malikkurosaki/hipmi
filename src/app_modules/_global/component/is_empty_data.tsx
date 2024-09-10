"use client";

import { Center, Text } from "@mantine/core";

export default function ComponentGlobal_IsEmptyData({
  text,
  height,
}: {
  text?: string;
  height?: number;
}) {
  return (
    <>
      <Center h={height ? `${height}vh` : "70vh"} fz={"sm"} fw={"bold"}>
        <Text c={"gray"}>{text ? text : "Tidak ada data"}</Text>
      </Center>
    </>
  );
}
