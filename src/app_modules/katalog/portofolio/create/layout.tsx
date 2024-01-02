"use client";

import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CreatePortofolioLayout({ children, profileId }: { children: any, profileId: any }) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <Header height={50} px={"sm"}>
            <Group position="apart" h={50}>
              <ActionIcon
                variant="transparent"
                onClick={() => router.push(`/dev/katalog/${profileId}`)}
              >
                <IconArrowLeft />
              </ActionIcon>
              <Text>Buat Portofolio</Text>
              <ActionIcon variant="transparent"></ActionIcon>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
