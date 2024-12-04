"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Card,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";

export function ComponentNotifikasi_CardSkeleton() {
  return (
    <>
      {Array.from(new Array(10)).map((e, i) => (
        <Card
          key={i}
          py={30}
          style={{
            backgroundColor: MainColor.darkblue,
            color: "gray",
            border: `2px solid ${AccentColor.darkblue}`,
            borderRadius: "10px 10px 10px 10px",
          }}
          mb={"xs"}
        >
          <Card.Section px={"lg"}>
            <Stack>
              <Group position="apart">
                <Skeleton h={20} w={100} radius={"xl"} />
                <Skeleton h={20} w={100} radius={"xl"} />
              </Group>
              <Divider color="gray" />
            </Stack>
          </Card.Section>

          <Card.Section p={"lg"}>
            <Stack>
              <Skeleton h={20} radius={"xl"} />
              <Skeleton h={20} radius={"xl"} />
            </Stack>
          </Card.Section>

          <Card.Section px={"lg"}>
            <Stack>
              
              <Group position="apart">
                <Skeleton h={20} w={100} radius={"xl"} />
                <Skeleton h={20} w={100} radius={"xl"} />
              </Group>
            </Stack>
          </Card.Section>
        </Card>
      ))}
    </>
  );
}
