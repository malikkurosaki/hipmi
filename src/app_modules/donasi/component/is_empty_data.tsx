"use client";

import { Center } from "@mantine/core";

export default function ComponentDonasi_IsEmptyData({
  text,
}: {
  text?: string;
}) {
  return (
    <>
      <Center h={"50vh"} fz={"sm"} c="gray" fw={"bold"} style={{ zIndex: 1 }}>
        {text ? text : "Tidak ada data"}
      </Center>
    </>
  );
}
