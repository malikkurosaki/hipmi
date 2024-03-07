"use client";

import { ActionIcon, AppShell, Group, Header, Title } from "@mantine/core";
import React from "react";
import ComponentForum_HeaderTamplate from "../component/header/header_tamplate";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

export default function LayoutForum_Detail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Postingan</Title>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
