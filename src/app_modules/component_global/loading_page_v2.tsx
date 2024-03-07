"use client";

import { Box, Center, Group, LoadingOverlay, Skeleton } from "@mantine/core";

export default function ComponentGlobal_V2_LoadingPage() {
  const customLOader = (
    <Center h={"100vh"}>
      <Group>
        {Array(3)
          .fill(0)
          .map((e, i) => (
            <Skeleton key={i} height={50} circle mb="xl" />
          ))}
      </Group>
    </Center>
  );

  return (
    <>
      
        <LoadingOverlay visible overlayBlur={2} loader={customLOader} />
      
    </>
  );
}
