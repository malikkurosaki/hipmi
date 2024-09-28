"use client";

import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/_global/component_layout_tamplate";
import {
  ActionIcon,
  Button,
  Group,
  Header,
  Modal,
  Stack,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconEdit
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutDetailDraftDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const [isLoadingDonasi, setLoadingDonasi] = useState(false);
  const [isLoadingCerita, setLoadingCerita] = useState(false);
  const [isLoadingRekening, setLoadingRekening] = useState(false);

  return (
    <>
      <AppComponentGlobal_LayoutTamplate
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
      </AppComponentGlobal_LayoutTamplate>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Button
            loaderPosition="center"
            loading={isLoadingDonasi ? true : false}
            style={{ transition: "0.5s" }}
            variant="outline"
            radius={"xl"}
            w={"100%"}
            color="blue"
            onClick={() => {
              setLoadingDonasi(true);
              router.push(RouterDonasi.edit_donasi + `${donasiId}`);
            }}
          >
            Edit Donasi
          </Button>
          <Button
            loaderPosition="center"
            loading={isLoadingCerita ? true : false}
            style={{ transition: "0.5s" }}
            variant="outline"
            radius={"xl"}
            w={"100%"}
            color="teal"
            onClick={() => {
              setLoadingCerita(true);
              router.push(RouterDonasi.edit_cerita_penggalang + `${donasiId}`);
            }}
          >
            Edit Cerita
          </Button>
          <Button
            loaderPosition="center"
            loading={isLoadingRekening ? true : false}
            style={{ transition: "0.5s" }}
            variant="outline"
            radius={"xl"}
            w={"100%"}
            color="orange"
            onClick={() => {
              setLoadingRekening(true);
              router.push(RouterDonasi.edit_rekening + `${donasiId}`);
            }}
          >
            Edit Rekening
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
