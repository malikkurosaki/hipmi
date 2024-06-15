"use client";

import { Center, Group, LoadingOverlay, Skeleton } from "@mantine/core";

export default function ComponentForum_LoadingDrawer() {
  const customLoad = (
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
      {customLoad}
    </>
  );
}
