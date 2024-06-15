"use client";

import { Center } from "@mantine/core";

export default function ComponentUserSearch_IsEmptyData({ text }: { text: string }) {
  return (
    <>
      <Center h={"50vh"} fz={"sm"} c="gray" fw={"bold"} style={{ zIndex: 1 }}>
        {text}
      </Center>
    </>
  );
}
