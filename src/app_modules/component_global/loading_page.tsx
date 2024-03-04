"use client";

import { Center, Group, Loader, Skeleton, Stack } from "@mantine/core";

/**
 * @param | is On Layout: 100%, is Not On Layout: 100vh
 * @returns Skeleton loading
 */
export default function ComponentGlobal_LoadingPage({ height }: { height: string }) {
  return (
    <>
      <Center h={height}>
        <Group>
          {Array(3)
            .fill(0)
            .map((e, i) => (
              <Skeleton key={i} height={50} circle mb="xl" />
            ))}
        </Group>
        {/* <Stack spacing={0}>
          {Array(3)
            .fill(0)
            .map((v, index) => (
              <Group key={index}>
                {Array(3)
                  .fill(0)
                  .map((e, i) => (
                    <Skeleton key={i} height={50} circle mb="xl" />
                  ))}
              </Group>
            ))}
        </Stack> */}
      </Center>
    </>
  );
}
