"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { Stack, Card, Group, ActionIcon, Divider, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleOff } from "@tabler/icons-react";

import ComponentForum_PostingAuthorNameOnHeader from "./header/posting_author_header_name";
import { MODEL_FORUM_POSTING } from "../model/interface";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_forum_total_komentar } from "../global_state";
import { forum_countOneTotalKomentarById } from "../fun/count/count_one_total_komentar_by_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";
import { IconMessageCircleX } from "@tabler/icons-react";

export default function ComponentForum_MainCardView({
  data,
  setLoadingKomen,
  setLoadingDetail,
  userLoginId,
}: {
  data: MODEL_FORUM_POSTING[];
  setLoadingKomen: any;
  setLoadingDetail: any;
  userLoginId: any
}) {
  const router = useRouter();
  return (
    <>
      <Stack spacing={"xl"}>
        {data.map((e, i) => (
          <Card key={i}>
            <Card.Section>
              {/* <pre>{JSON.stringify( typeof e.ForumMaster_StatusPosting.id)}</pre> */}
              <ComponentForum_PostingAuthorNameOnHeader
                authorName={e?.Author?.Profile?.name}
                imagesId={e?.Author?.Profile?.imagesId}
                tglPublish={e?.createdAt}
                isMoreButton={true}
                authorId={e?.Author?.id}
                postingId={e?.id}
                statusId={e?.ForumMaster_StatusPosting?.id}
                userLoginId={userLoginId}
              />
            </Card.Section>
            <Card.Section
              sx={{ zIndex: 0 }}
              p={"lg"}
              onClick={() => {
                // console.log("halaman forum");
                setLoadingDetail(true);
                router.push(RouterForum.main_detail + e.id);
              }}
            >
              <Text fz={"sm"} lineClamp={4}>
                <div dangerouslySetInnerHTML={{ __html: e.diskusi }} />
              </Text>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Group spacing={"xs"} px={"sm"}>
                  <ActionIcon
                    // loading={loadingKomen ? true : false}
                    variant="transparent"
                    sx={{ zIndex: 1 }}
                    onClick={() => {
                      (e?.ForumMaster_StatusPosting.id as any) === 1
                        ? (router.push(RouterForum.komentar + e?.id),
                          setLoadingKomen(true))
                        : router.push(RouterForum.main_detail + e?.id);
                    }}
                  >
                    {(e?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                      <IconMessageCircle color="gray" size={25} />
                    ) : (
                      <IconMessageCircleX color="gray" size={25} />
                    )}
                  </ActionIcon>

                  {/* <TotalKomentar postingId={e?.id} /> */}

                  <Text c={"gray"}>{e?._count}</Text>
                </Group>
                <Divider />
              </Stack>
            </Card.Section>
          </Card>
        ))}
      </Stack>
    </>
  );
}
