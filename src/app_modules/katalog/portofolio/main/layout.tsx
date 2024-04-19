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
import { useState } from "react";

export default function PortofolioLayout({
  children,
  portoId,
  userLoginId,
  authorId,
}: {
  children: any;
  portoId: any;
  userLoginId: string;
  authorId: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);

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
              {userLoginId === authorId ? (
                <ActionIcon variant="transparent" onClick={() => open()}>
                  <IconEdit />
                </ActionIcon>
              ) : (
                <ActionIcon disabled variant="transparent"></ActionIcon>
              )}
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
              loaderPosition="center"
              loading={loadingData ? true : false}
              onClick={() => {
                setLoadingData(true);
                router.push(RouterPortofolio.edit_data_bisnis + `${portoId}`);
              }}
            >
              Data Bisnis
            </Button>
            <Button
              radius={"xl"}
              variant="outline"
              color="green"
              loaderPosition="center"
              loading={loadingLogo ? true : false}
              onClick={() => {
                setLoadingLogo(true);
                router.push(RouterPortofolio.edit_logo_bisnis + `${portoId}`);
              }}
            >
              Logo Bisnis
            </Button>
            <Button
              radius={"xl"}
              variant="outline"
              color="orange"
              loaderPosition="center"
              loading={loadingMedia ? true : false}
              onClick={() => {
                setLoadingMedia(true);
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
