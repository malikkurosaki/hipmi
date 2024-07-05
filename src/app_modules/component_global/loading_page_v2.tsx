"use client";

import {
  Box,
  Center,
  Group,
  LoadingOverlay,
  Skeleton,
  Text,
} from "@mantine/core";
import { MainColor } from "./color/color_pallet";

export default function ComponentGlobal_V2_LoadingPage() {
  const listhHuruf = [
    {
      huruf: "H",
    },
    {
      huruf: "I",
    },
    {
      huruf: "P",
    },
    {
      huruf: "M",
    },
    {
      huruf: "I",
    },
  ];
  const customLOader = (
    <Center h={"100vh"}>
      <Group>
        {listhHuruf.map((e, i) => (
          <Center key={i} h={"100%"}>
            <Skeleton  height={50} circle radius={"100%"} />
            <Text sx={{ position: "absolute" }} c={"gray.4"} fw={"bold"}>
              {e.huruf}
            </Text>
          </Center>
        ))}
      </Group>
    </Center>
  );

  return (
    <>
      <LoadingOverlay
        visible
        // overlayColor={MainColor.darkblue}
        overlayOpacity={0.1}
        loader={customLOader}
      />
    </>
  );
}
