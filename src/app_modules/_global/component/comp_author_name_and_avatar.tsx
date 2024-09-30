"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  Avatar,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Overlay,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import React, { useState } from "react";
import { ComponentGlobal_NotifikasiPeringatan } from "../notif_global/notifikasi_peringatan";

export default function ComponentGlobal_AvatarAndAuthorName({
  dataUser,
  isPembatas,
  componentRight,
}: {
  dataUser: MODEL_USER;
  isPembatas?: boolean;
  componentRight?: React.ReactNode;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (dataUser?.Profile?.id) {
                setVisible(true);
                router.push(RouterProfile.katalogOLD + dataUser?.Profile?.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            {visible ? (
              <Avatar
                size={30}
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                radius={"xl"}
                bg={"gray.1"}
              >
                <Overlay opacity={0.1}>
                  <Center h={"100%"}>
                    <Loader color="gray" size={20} />
                  </Center>
                </Overlay>
              </Avatar>
            ) : (
              <Avatar
                size={30}
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                radius={"xl"}
                bg={"gray.1"}
                src={
                  dataUser?.Profile?.imagesId
                    ? RouterProfile.api_foto_profile +
                      dataUser?.Profile?.imagesId
                    : "/aset/global/avatar.png"
                }
              />
            )}
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"} c={"white"}>
              <Group position="apart">
                <Stack justify="center" h={"100%"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {dataUser?.username ? dataUser?.username : "Nama author"}
                  </Text>
                </Stack>
                {componentRight ? componentRight : null}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
