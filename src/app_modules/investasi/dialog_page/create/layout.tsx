"use client";

import { RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  AppShell,
  CloseButton,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import router from "next/router";
import React from "react";

export default function LayoutDialogPageCreateInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useShallowEffect(() => {
    setTimeout(() => router.push(RouterInvestasi.portofolio), 3000);
  }, []);
  return (
    <>
      <AppShell
        footer={
          <Footer height={80} sx={{ borderStyle: "none" }}>
            <Group spacing={4} position="center">
              <IconAlertTriangle color="orange" size={20} />
              <Text fz={"sm"}>Mohon menunggu validasi Admin</Text>
            </Group>
          
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
