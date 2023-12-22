"use client";

import {
  ActionIcon,
  AppShell,
  Button,
  Footer,
  Group,
  Header,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import React from "react";
import HeaderTamplateDonasi from "../../component/header_tamplate";
import {
  IconChevronLeft,
  IconEdit,
  IconMessageShare,
} from "@tabler/icons-react";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { useDisclosure } from "@mantine/hooks";
import router from "next/router";
import { title } from "process";
import { useRouter } from "next/navigation";

export default function LayoutDetailDraftDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  return (
    <>
      <AppShell
        header={
          <Header height={50} sx={{ borderStyle: "none" }}>
            <Group h={50} position="apart" px={"md"}>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  router.back();
                }}
              >
                <IconChevronLeft />
              </ActionIcon>
              <Title order={5}>Detail Draft</Title>
              <ActionIcon variant="transparent" onClick={() => open()}>
                <IconEdit />
              </ActionIcon>
            </Group>
          </Header>
        }
      >
        {children}
      </AppShell>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Button
            variant="outline"
            radius={"xl"}
            w={"100%"}
            color="blue"
            onClick={() => router.push(RouterDonasi.edit_donasi)}
          >
            Edit Donasi
          </Button>
          <Button
            variant="outline"
            radius={"xl"}
            w={"100%"}
            color="teal"
            onClick={() => router.push(RouterDonasi.edit_cerita_penggalang)}
          >
            Edit Cerita
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
