"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { Stack, Card, Group, ActionIcon, Divider, Text } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";

import ComponentForum_PostingAuthorNameOnHeader from "./header/posting_author_header_name";
import { MODEL_FORUM_POSTING } from "../model/interface";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_forum_total_komentar } from "../global_state";
import { forum_countOneTotalKomentarById } from "../fun/count/count_one_total_komentar_by_id";

export default function ComponentForum_MainCardView({
  data,
  setLoadingKomen,
  setLoadingDetail,
}: {
  data: MODEL_FORUM_POSTING[];
  setLoadingKomen: any;
  setLoadingDetail: any;
}) {
  const router = useRouter();
  return (
    <>
      <Stack>
        {data.map((e, i) => (
          <Card key={i}>
            <Card.Section>
              <ComponentForum_PostingAuthorNameOnHeader
                authorName={e?.Author?.Profile?.name}
                imagesId={e?.Author?.Profile?.imagesId}
                tglPublish={e?.createdAt}
                isMoreButton={true}
                authorId={e?.Author?.id}
                postingId={e?.id}
              />
            </Card.Section>
            <Card.Section
              sx={{ zIndex: 0 }}
              p={"sm"}
              onClick={() => {
                // console.log("halaman forum");
                setLoadingDetail(true);
                router.push(RouterForum.main_detail + e.id);
              }}
            >
              <Stack spacing={"xs"}>
                <Text fz={"sm"} lineClamp={4}>
                  <div dangerouslySetInnerHTML={{ __html: e.diskusi }} />
                </Text>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack>
                <Group spacing={"xs"} px={"sm"}>
                  <ActionIcon
                    // loading={loadingKomen ? true : false}
                    variant="transparent"
                    sx={{ zIndex: 1 }}
                    onClick={() => {
                      setLoadingKomen(true);
                      router.push(RouterForum.komentar + e.id);
                    }}
                  >
                    <IconMessageCircle color="gray" size={25} />
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
function TotalKomentar({ postingId }: { postingId: string }) {
  const [value, setValue] = useState(0)

  useShallowEffect(() => {
    forum_countOneTotalKomentarById(postingId).then((res) => {
      setValue(res);
    });
  }, [postingId]);

  return (
    <>
      <Text c={"gray"}>{value}</Text>
    </>
  );
}
