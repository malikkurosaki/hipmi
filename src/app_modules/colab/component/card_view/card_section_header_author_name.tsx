"use client";

import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";
import {
  ActionIcon,
  Avatar,
  Card,
  Divider,
  Grid,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { useRouter } from "next/navigation";
import { IconDots, IconEdit } from "@tabler/icons-react";
import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function ComponentColab_CardSectionHeaderAuthorName({
  profileId,
  imagesId,
  authorName,
  isPembatas,
  isAuthor,
  colabId,
}: {
  profileId?: string;
  imagesId?: string;
  authorName?: string;
  isPembatas?: boolean;
  isAuthor?: boolean;
  colabId?: string;
}) {
  const router = useRouter();

  return (
    <>
      <Card.Section px={"md"}>
        <Stack spacing={"xs"}>
          <Grid>
            <Grid.Col
              span={"content"}
              onClick={() => {
                if (profileId) {
                  router.push(RouterProfile.katalog + profileId);
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
                  imagesId
                    ? RouterProfile.api_foto_profile + imagesId
                    : "/aset/global/avatar.png"
                }
              />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Stack justify="center" h={"100%"}>
                <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                  {authorName ? authorName : "Nama author"}
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={"content"}>
              <ButtonAction
                isAuthor={isAuthor as any}
                colabId={colabId as any}
              />
            </Grid.Col>
          </Grid>
          {isPembatas ? <Divider /> : ""}
        </Stack>
      </Card.Section>
    </>
  );
}

function ButtonAction({
  isAuthor,
  colabId,
}: {
  isAuthor: boolean;
  colabId: string;
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Menu
        opened={opened}
        onChange={setOpened}
        position="left-start"
        offset={0}
        shadow="lg"
        withArrow
        arrowPosition="center"
      >
        <Menu.Target >
          <Stack justify="center" h={"100%"} >
            <ActionIcon variant="transparent">
              {isAuthor ? <IconDots size={20} /> : ""}
            </ActionIcon>
          </Stack>
        </Menu.Target>
        <Menu.Dropdown bg={"gray.1"} >
          <Menu.Item
            icon={<IconEdit size={15} />}
            onClick={() => {
              router.push(RouterColab.edit + colabId);
            }}
          >
            Edit
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
