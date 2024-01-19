"use client";

import { Logout } from "@/app_modules/auth";
import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import {
  IconUserSearch,
  IconAward,
  IconQrcode,
  IconArrowLeft,
  IconPencilPlus,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentKatalog_HeaderTamplate from "../component/header_tamplate";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

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
          <ComponentKatalog_HeaderTamplate
            title="Katalog"
            bg={"black"}
            titleColor="white"
            // route={RouterHome.main_home}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
