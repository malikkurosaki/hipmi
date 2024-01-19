"use client";

import { Header, Group, ActionIcon, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ComponentGlobal_HeaderTamplate({
  route,
  route2,
  title,
  icon,
}: {
  route?: any;
  route2?: any;
  title: string;
  icon?: any;
}) {
  const router = useRouter();
  return (
    <>
      <Header height={50} sx={{ borderStyle: "none" }}>
        <Group h={50} position="apart" px={"md"}>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              if (route === null || route === undefined) {
                return router.back();
              } else {
                return router.push(route);
              }
            }}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Title order={5}>{title}</Title>
          {(() => {
            if (route2 === null || route2 === undefined) {
              return <ActionIcon disabled variant="transparent"></ActionIcon>;
            } else {
              return (
                <ActionIcon
                  variant="transparent"
                  onClick={() => router.push(route2)}
                >
                  {icon}
                </ActionIcon>
              );
            }
          })()}
        </Group>
      </Header>
    </>
  );
}
