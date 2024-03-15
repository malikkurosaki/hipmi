"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { Stack, Grid, Avatar, Divider, Text, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
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

export default function ComponentForum_PostingAuthorNameOnHeader({
  authorId,
  postingId,
  imagesId,
  authorName,
  tglPublish,
  isPembatas,
  isMoreButton,
}: {
  authorId?: string;
  postingId?: string;
  imagesId?: string;
  authorName?: string;
  tglPublish?: Date;
  isPembatas?: boolean;
  isMoreButton?: boolean;
}) {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (authorId) {
                router.push(RouterForum.forumku + authorId);
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
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {authorName
                      ? authorName
                      : "Nama author coba di berikan panjang "}
                  </Text>
                </Grid.Col>
                {/* <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} c={"gray"}>
                    {username ? username : "@username "}
                  </Text>
                </Grid.Col> */}
                <Grid.Col span={"content"}></Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text c={"gray"} fz={"sm"}>
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
                    color="gray"
                    style={{ marginLeft: "5px" }}
                  />
                </Text>
              </Group>
              {isMoreButton ? (
                <Group position="right">
                  <ComponentForum_PostingButtonMore
                    authorId={authorId}
                    postingId={postingId as any}
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
