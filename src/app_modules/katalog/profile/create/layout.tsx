"use client";

import ComponentGlobal_HeaderTamplate from "@/app_modules/component_global/header_tamplate";
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

export default function ProfileLayout({ children }: { children: any }) {
  const router = useRouter()
  return (
    <>
      <AppShell

        header={
          // <Header height={50} px={"sm"} sx={{borderBlockStyle: "none"}}>
          //   <Group position="apart" h={50}>
          //     <ActionIcon variant="transparent" onClick={() => router.push("/dev/home")}>
          //       <IconArrowLeft />
          //     </ActionIcon>
          //     <Text>Create Profile</Text>
          //     <ActionIcon variant="transparent"></ActionIcon>
          //   </Group>
          // </Header>
          <ComponentGlobal_HeaderTamplate title="Buat Profile"/>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
