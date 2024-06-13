"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { Stack, Card, Group, ActionIcon, Divider, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ComponentForum_BerandaAuthorNameOnHeader from "../beranda/beranda_author_header";
import ComponentForum_V2_HeaderCard from "./card_header";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import { useState } from "react";
import ComponentGlobal_CardLoadingOverlay from "@/app_modules/component_global/loading_card";
import ComponentForum_CardLoadingOverlay from "../card_loader";

export default function ComponentForum_V2_MainCardView({
  data,
  userLoginId,
  onLoadData,
}: {
  data: MODEL_FORUM_POSTING[];
  userLoginId: string;
  onLoadData: (val: any) => void;
}) {
  const router = useRouter();
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [postingId, setPostingId] = useState("");

  return (
    <>
      <Stack spacing={"xl"}>
        {data.map((e, i) => (
          <Card key={i} >
            <Card.Section>
              <ComponentForum_V2_HeaderCard
                data={e}
                isMoreButton={true}
                userLoginId={userLoginId}
                onLoadData={onLoadData}
              />
              {/* <ComponentForum_BerandaAuthorNameOnHeader
                tglPublish={e?.createdAt}
                isMoreButton={true}
                postingId={e?.id}
                statusId={e?.ForumMaster_StatusPosting?.id}
                userLoginId={userLoginId}
                setData={setData}
              /> */}
            </Card.Section>

            <Card.Section
              sx={{ zIndex: 0 }}
              p={"lg"}
              onClick={() => {
                  router.push(RouterForum.main_detail + e.id)
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
                    loading={loadingKomen && e?.id === postingId ? true : false}
                    variant="transparent"
                    sx={{ zIndex: 1 }}
                    onClick={() => {
                      setPostingId(e?.id),
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

                  <Text c={"gray"}>{e?.Forum_Komentar.length}</Text>
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
