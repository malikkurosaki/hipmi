"use client";

import { Header, Group, ActionIcon, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderTransparent({
  route,
  icon2,
  title,
}: {
  route: any;
  icon2: any;
  title: string;
}) {
  const router = useRouter();
  return (
    <>

      <Header height={50} px={"sm"}>
        <Group position="apart" h={50}>
          <ActionIcon variant="transparent" onClick={() => router.push(route)}>
            <IconArrowLeft />
          </ActionIcon>

          <Text>{title}</Text>
          {icon2}
        </Group>
      </Header>
    </>
  );
}
