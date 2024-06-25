"use client";

import { Center } from "@mantine/core";

export default function ComponentGlobal_IsEmptyData({
  text,
  height,
}: {
  text: string;
  height?: number}) {
  return (
    <>
      <Center
        h={height ? `${height}vh` : "50vh"}
        fz={"sm"}
        fw={"bold"}
        c={"gray"}
      >
        {text}
      </Center>
    </>
  );
}
