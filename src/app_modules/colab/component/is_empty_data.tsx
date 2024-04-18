"use client";

import { Center } from "@mantine/core";

export default function ComponentColab_IsEmptyData({ text }: { text: string }) {
  return (
    <>
      <Center h={"50vh"} fz={"sm"} c="gray" fw={"bold"}>
        {text}
      </Center>
    </>
  );
}
