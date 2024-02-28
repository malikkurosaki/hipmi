"use client";

import { Center } from "@mantine/core";

export default function ComponentJob_IsEmptyData({ text }: { text: string }) {
  return (
    <>
      <Center h={"50vh"} fz={"sm"} fw={"bold"}>
        {text}
      </Center>
    </>
  );
}
