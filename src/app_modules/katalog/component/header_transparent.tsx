"use client";

import { Header, Group, ActionIcon, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";

export default function headerTransparent({
  icon1,
  icon2,
  title,
}: {
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <Header height={50} px={"sm"}>
        <Group position="apart" h={50}>
          {icon1}
          <Text>{title}</Text>
          {icon2}
        </Group>
      </Header>
    </>
  );
}
