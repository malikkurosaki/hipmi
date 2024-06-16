"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  Stack,
  Grid,
  Avatar,
  Divider,
  Text,
  Group,
  ActionIcon,
  Drawer,
  ScrollArea,
  Title,
  Paper,
  Button,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { IconEyeCheck, IconZoomCheck } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { IconFileCheck } from "@tabler/icons-react";

export default function ComponentColab_AuthorNameOnListPartisipan({
  author,
  isPembatas,
  deskripsi,
}: {
  author?: MODEL_USER;
  isPembatas?: boolean;
  deskripsi?: string;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        size={"40vh"}
        withCloseButton={false}
      >
        <Stack>
          <Title order={6}>Deskripsi Diri</Title>
          <Paper withBorder p={"xs"}>
            <ScrollArea h={"20vh"} scrollbarSize={2}>
              <Text>{deskripsi}</Text>
            </ScrollArea>
          </Paper>
          <Button radius={"xl"} onClick={close}>
            Tutup
          </Button>
        </Stack>
      </Drawer>

      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (author?.Profile.id) {
                router.push(RouterProfile.katalog + author?.Profile.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={30}
              sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
              radius={"xl"}
              bg={"gray.1"}
              src={
                author?.Profile.imagesId
                  ? RouterProfile.api_foto_profile + author?.Profile.imagesId
                  : "/aset/global/avatar.png"
              }
            />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {author?.Profile.name ? author?.Profile.name : "Nama author"}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Stack justify="center" h={"100%"}>
              {deskripsi ? (
                <ActionIcon
                  onClick={() => open()}
                  radius={"xl"}
                  variant="transparent"
                >
                  <IconFileCheck color={opened ? "blue" : "gray"}/>
                </ActionIcon>
              ) : (
                ""
              )}
            </Stack>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
