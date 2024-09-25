"use client";

import { ActionIcon, Group, Header, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ComponentKatalog_HeaderTamplate({
  hideBack,
  changeIconBack,
  route,
  route2,
  title,
  icon,
  bg,
  titleColor,
}: {
  hideBack?: boolean;
  changeIconBack?: any;
  route?: any;
  route2?: any;
  title: string;
  icon?: any;
  bg?: any;
  titleColor?: string
}) {
  const router = useRouter();
  return (
    <>
      <Header
        height={50}
        sx={{ borderStyle: "none" }}
        bg={bg === null ? "" : bg}
      >
        <Group h={50} position="apart" px={"md"}>
          {hideBack ? (
            <ActionIcon variant="transparent" disabled></ActionIcon>
          ) : (
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
              {changeIconBack ? changeIconBack : <IconChevronLeft />}
            </ActionIcon>
          )}
          <Title order={5} c={titleColor ? titleColor : "black"} >{title}</Title>
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
