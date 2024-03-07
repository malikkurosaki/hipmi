"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import {
  Stack,
  Grid,
  Avatar,
  Divider,
  Text,
  Group,
  ThemeIcon,
  ActionIcon,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  IconCircleFilled,
  IconDots,
  IconMessageCircle,
} from "@tabler/icons-react";
import { IconCircle } from "@tabler/icons-react";
import ButtonMore from "./button_more";

export default function ComponentForum_AuthorNameOnDetail({
  forumId,
  imagesId,
  authorName,
  username,
  tglPublish,
  isPembatas,
  tipe,
}: {
  forumId?: string;
  imagesId?: string;
  authorName?: string;
  username?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  tipe: string
}) {
  const router = useRouter();
  const skrng = new Date();
  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (forumId) {
                router.push(RouterForum.forumku + forumId);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            <Avatar
              size={40}
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
            <Stack spacing={0}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                {authorName ? authorName : "Nama author "}
              </Text>
              <Text lineClamp={1} fz={"xs"} c={"gray"}>
                {username ? username : "@username "}
              </Text>
            </Stack>

            {/* <Stack justify="center" h={"100%"}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {authorName ? authorName : "Nama author "}
                  </Text>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} c={"gray"}>
                    {username ? username : "@username "}
                  </Text>
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Group spacing={3}>
                    <IconCircle size={5} color="gray" />
                    <Text c={"gray"} fz={"sm"}>
                      {skrng.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack> */}
          </Grid.Col>
          <Grid.Col span={"content"}>
           <ButtonMore id={forumId} tipe="posting"/>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
