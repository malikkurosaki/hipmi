"use client";

import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Header,
  Modal,
  Stack,
  Title,
} from "@mantine/core";
import HeaderTransparent from "../../component/header_transparent";

import { useRouter } from "next/navigation";
import { IconArrowLeft, IconChevronLeft, IconEdit } from "@tabler/icons-react";
import ComponentKatalog_HeaderTamplate from "../../component/header_tamplate";
import { title } from "process";
import { useDisclosure } from "@mantine/hooks";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";

export default function PortofolioLayout({
  children,
  portoId,
}: {
  children: any;
  portoId: any;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
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
              <Title order={5}>Detail Portofolio</Title>
              <ActionIcon variant="transparent" onClick={() => open()}>
                <IconEdit />
              </ActionIcon>
            </Group>
          </Header>
        }
      >
        <Modal opened={opened} onClose={close} centered withCloseButton={false}>
          <Stack>
            <Title order={6}>Anda ingin mengupdate Detail Bisnis ?</Title>
            <Button
              radius={"xl"}
              variant="outline"
              onClick={() => {
                router.push(RouterPortofolio.edit_data_bisnis + `${portoId}`);
              }}
            >
              Data Bisnis
            </Button>
            <Button
              radius={"xl"}
              variant="outline"
              color="green"
              onClick={() => {
                router.push(RouterPortofolio.edit_logo_bisnis + `${portoId}`);
              }}
            >
              Logo Bisnis
            </Button>
            <Button
              radius={"xl"}
              variant="outline"
              color="orange"
              onClick={() => {
                router.push(RouterPortofolio.edit_medsos_bisnis + `${portoId}`);
              }}
            >
              Media Sosial
            </Button>
          </Stack>
        </Modal>
        {children}
      </AppShell>
    </>
  );
}
