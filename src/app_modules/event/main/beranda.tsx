"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Event_Beranda() {
  const router = useRouter();
  return (
    <>
      {Array(5)
        .fill(0)
        .map((e, i) => (
          <Card
            key={i}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            mb={"md"}
            onClick={() => router.push(RouterEvent.detail_main)}
          >
            {/* <Card.Section p={"xs"}>
                  <Skeleton visible={loading} h={200}></Skeleton>
                </Card.Section> */}

            <Stack>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Nama Event</Text>
                <Text fz={"sm"}>{moment(new Date()).format("ll")}</Text>
              </Group>

              <Text size="sm" color="dimmed" lineClamp={2}>
                Deskripsi: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Nisi non ducimus voluptatibus vel, officiis assumenda
                explicabo reiciendis consequatur consequuntur expedita maiores
                fugit natus est rem sapiente iusto earum dicta labore.
              </Text>

              {/* <Group position="apart">
                {Array(6)
                  .fill(0)
                  .map((e, i) => (
                    <Avatar key={i} bg="blue" radius={"xl"} />
                  ))}
              </Group> */}
            </Stack>
          </Card>
        ))}
    </>
  );
}
