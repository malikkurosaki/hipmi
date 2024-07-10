"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Stack, Grid, Avatar, Divider, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  IconCircleFilled,
  IconDots,
  IconEdit,
  IconFlag3,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";
import { IconCircle } from "@tabler/icons-react";
import { IoIosMore } from "react-icons/io";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ComponentForum_PostingButtonMore from "../more_button/posting_button_more";
import ComponentForum_KomentarButtonMore from "./komentar_button_more";

export default function ComponentForum_KomentarAuthorNameOnHeader({
  userId,
  komentarId,
  imagesId,
  authorName,
  tglPublish,
  isPembatas,
  isMoreButton,
  setKomentar,
  postingId,
  userLoginId,
}: {
  userId?: string;
  komentarId?: string;
  imagesId?: string;
  authorName?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  isMoreButton?: boolean;
  setKomentar?: any;
  postingId?: string;
  userLoginId: string;
}) {
  const router = useRouter();

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (userId) {
                router.push(RouterForum.forumku + userId);
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
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text color="white" lineClamp={1} fz={"sm"} fw={"bold"}>
                    {authorName ? authorName : "Nama author  "}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text c={"white"} fz={"sm"}>
                  {tglPublish
                    ? tglPublish.toLocaleDateString(["id-ID"], {
                        day: "numeric",
                        month: "short",
                      })
                    : new Date().toLocaleDateString(["id-ID"], {
                        day: "numeric",
                        month: "short",
                      })}

                  <IconCircle
                    size={5}
                    color="white"
                    style={{ marginLeft: "5px" }}
                  />
                </Text>
              </Group>
              {isMoreButton ? (
                <Group position="right">
                  <ComponentForum_KomentarButtonMore
                    userId={userId}
                    komentarId={komentarId}
                    setKomentar={setKomentar}
                    postingId={postingId}
                    userLoginId={userLoginId}
                  />
                </Group>
              ) : (
                ""
              )}
            </Group>
          </Grid.Col>
        </Grid>
        {isPembatas ? <Divider /> : ""}
      </Stack>
    </>
  );
}
