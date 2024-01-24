"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function Event_StatusReview() {
  const router = useRouter()
  return (
    <>
      {Array(5)
        .fill(0)
        .map((e, i) => (
          <Paper
            key={i}
            shadow="lg"
            radius={"md"}
            p={"md"}
            withBorder
            mb={"md"}
            onClick={() => router.push(RouterEvent.detail_review)}
          >
            <Stack>
              <Group position="apart">
                <Title order={6}>Nama Event</Title>
                <Text fz={"sm"}>{moment(new Date()).format("ll")}</Text>
              </Group>
              <Text fz={"sm"} lineClamp={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                velit modi ut consequatur, iure eaque numquam id iste, nihil
                laborum facilis dolores vel possimus earum ullam, necessitatibus
                omnis tenetur repellendus.
              </Text>
            </Stack>
          </Paper>
        ))}
    </>
  );
}
