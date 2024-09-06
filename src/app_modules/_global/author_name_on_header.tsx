"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  Stack,
  Grid,
  Avatar,
  Divider,
  Text,
  Group,
  Loader,
  Overlay,
  Center,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "./notif_global/notifikasi_peringatan";
import moment from "moment";
import { useState } from "react";

export default function ComponentGlobal_AuthorNameAndAvatar({
  profileId,
  imagesId,
  authorName,
  tglPublish,
  isPembatas,
}: {
  profileId?: string;
  imagesId?: string;
  authorName?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
}) {
  const router = useRouter();
  const skrng = new Date();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (profileId) {
                setVisible(true);
                router.push(RouterProfile.katalog + profileId);
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
                  imagesId
                    ? RouterProfile.api_foto_profile + imagesId
                    : "/aset/global/avatar.png"
                }
              />
            )}
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"} c={"white"}>
              <Group position="apart">
                <Stack justify="center" h={"100%"} >
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {authorName ? authorName : "Nama author"}
                  </Text>
                </Stack>
                <Stack justify="center" h={"100%"}>
                  {tglPublish ? (
                    <Text c={"white"} fz={"xs"}>
                      {skrng.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  ) : (
                    ""
                  )}
                </Stack>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
