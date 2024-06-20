"use client";

import loading from "@/app/dev/home/loading";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import {
  Stack,
  Loader,
  Avatar,
  Badge,
  Group,
  Divider,
  Grid,
  Text,
} from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import ComponentForum_BerandaButtonMore from "../beranda/beranda_button_more";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_V2_CardMoreButton from "./card_more_button";

export default function ComponentForum_V2_HeaderCard({
  data,
  isMoreButton,
  userLoginId,
  onLoadData,
  allData,
}: {
  data: MODEL_FORUM_POSTING;
  isMoreButton: boolean;
  userLoginId: string;
  onLoadData: (val: any) => void;
  allData: any[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid align="center">
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (data.Author.id) {
                setIsLoading(true);
                router.push(RouterForum.forumku + data.Author.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            {isLoading ? (
              <Loader color="gray" variant="dots" />
            ) : (
              <Avatar
                size={40}
                sx={{ borderStyle: "solid", borderWidth: "0.5px" }}
                radius={"xl"}
                bg={"gray.1"}
                src={
                  data.Author.Profile.imagesId
                    ? RouterProfile.api_foto_profile +
                      data.Author.Profile.imagesId
                    : "/aset/global/avatar.png"
                }
              />
            )}
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <Stack justify="center" h={"100%"} spacing={3}>
              <Grid>
                <Grid.Col span={"auto"}>
                  <Text lineClamp={1} fz={"sm"} fw={"bold"}>
                    {data.Author.username
                      ? data.Author.username
                      : "Nama author  "}
                  </Text>
                </Grid.Col>
                <Grid.Col span={"content"}></Grid.Col>
              </Grid>

              <Badge
                w={70}
                variant="light"
                color={
                  (data.ForumMaster_StatusPosting.id as any) === 1
                    ? "green"
                    : "red"
                }
              >
                <Text fz={10}>{data?.ForumMaster_StatusPosting.status}</Text>
              </Badge>
            </Stack>
          </Grid.Col>

          <Grid.Col span={"content"}>
            <Group position="center" spacing={"xs"}>
              <Group spacing={3}>
                <Text c={"gray"} fz={"sm"}>
                  {data.createdAt !== undefined && data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString(["id-ID"], {
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
                  <ComponentForum_V2_CardMoreButton
                    authorId={data?.Author.id}
                    postingId={data?.id}
                    statusId={data?.ForumMaster_StatusPosting.id}
                    userLoginId={userLoginId}
                    onLoadData={onLoadData}
                    allData={allData}
                  />
                </Group>
              ) : (
                ""
              )}
            </Group>
          </Grid.Col>
        </Grid>
        {/* {isPembatas ? <Divider /> : ""} */}
      </Stack>
    </>
  );
}
