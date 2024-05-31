"use client";

import { Center } from "@mantine/core";

export default function ComponentInvestasi_IsEmptyData({ text }: { text: string }) {
  return (
    <>
      <Center h={"50vh"} fz={"sm"} fw={"bold"} c={"gray"}>
        {text}
      </Center>
    </>
  );
}
