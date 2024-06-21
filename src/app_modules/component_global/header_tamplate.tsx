"use client";

import { Header, Group, ActionIcon, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isRightLoading, setRightLoading] = useState(false);

  return (
    <>
      <Header height={50} sx={{ borderStyle: "none" }}>
        <Group h={50} position="apart" px={"md"}>
          <ActionIcon
            loading={isLoading ? true : false}
            variant="transparent"
            onClick={() => {
              setIsLoading(true);
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
                  loading={isRightLoading ? true : false}
                  variant="transparent"
                  onClick={() => {
                    setRightLoading(true);
                    router.push(route2);
                  }}
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
