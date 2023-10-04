"use client";

import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function EditProfileLayout({ children }: { children: any }) {
  const router = useRouter()
  return (
    <>
      <AppShell

        header={
          <Header height={50} px={"sm"}>
            <Group position="apart" h={50}>
              <ActionIcon variant="transparent" onClick={() => router.push("/dev/katalog/view")}>
                <IconArrowLeft />
              </ActionIcon>
              <Text>Edit Profile</Text>
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
