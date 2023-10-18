"use client";

import { ActionIcon, AppShell } from "@mantine/core";
import HeaderTransparent from "../../component/header_transparent";

import { useRouter } from "next/navigation";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

export default function PortofolioLayout({ children, profileId }: { children: any, profileId: any }) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <HeaderTransparent
            route={`/dev/katalog/${profileId}`}
            title="Portofolio"
            icon2={
              <ActionIcon
                variant="transparent"
                onClick={() => router.push("/dev/portofolio/edit")}
              >
                <IconEdit />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
}
