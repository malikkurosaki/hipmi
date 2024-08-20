"use client"

import { Grid, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export function ComponentMap_SkeletonDrawerDetailData() {
  return (
    <Stack mt={"lg"} spacing={"xl"}>
      <Grid>
        <Grid.Col span={2}>
          <Skeleton height={50} circle mb="xl" />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Skeleton height={8} radius="xl" />
        </Grid.Col>
      </Grid>

      <SimpleGrid
        cols={2}
        spacing={"lg"}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "md" },
          { maxWidth: 755, cols: 1, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <Skeleton height={100} radius="xl" />
        <Stack>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}
