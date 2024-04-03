"use client";

import { Logout } from "@/app_modules/auth";
import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Text,
  Title,
} from "@mantine/core";
import {
  IconUserSearch,
  IconAward,
  IconQrcode,
  IconArrowLeft,
  IconPencilPlus,
  IconChevronLeft,
  IconDashboard,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentKatalog_HeaderTamplate from "../component/header_tamplate";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { title } from "process";
import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";

export default function KatalogLayout({
  children,
  profileId,
}: {
  children: any;
  profileId: any;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          // <ComponentKatalog_HeaderTamplate
          //   title="Katalog"
          //   bg={"black"}
          //   titleColor="white"
          //   // route={RouterHome.main_home}
          // />
          <Header height={50} sx={{ borderStyle: "none" }} bg={"black"}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5} c={"white"}>
                Katalog
              </Title>
              <ActionIcon variant="transparent" disabled></ActionIcon>
              {/* <ActionIcon
                variant="transparent"
                onClick={() => router.push(RouterAdminDashboard.splash_admin)}
              >
                <IconDashboard />
              </ActionIcon> */}
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
