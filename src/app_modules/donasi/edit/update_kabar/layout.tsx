"use client";

import {
  AppShell,
  Button,
  Center,
  Divider,
  Footer,
  Group,
  Header,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import FooterDonasi from "../../component/footer_close_donasi";
import HeaderTamplateDonasi from "../../component/header_tamplate";

export default function LayoutUpdateKabarDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppShell
        header={<HeaderTamplateDonasi title="Update Kabar" />}
        footer={
          <Footer height={70}>
            <Group align="center" h={"100%"} position="center" spacing={"xl"}>
              <Button radius={"xl"} variant="outline" color="green">
                Edit
              </Button>
              <Button radius={"xl"} variant="outline" color="red">
                Hapus
              </Button>
            </Group>
          </Footer>
        }
      >
        {children}
      </AppShell>
    </>
  );
}
