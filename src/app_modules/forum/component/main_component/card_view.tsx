"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { ActionIcon, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_V2_HeaderCard from "./card_header";

export default function ComponentForum_V2_MainCardView({
  data,
  userLoginId,
  onLoadData,
  allData,
}: {
  data: MODEL_FORUM_POSTING;
  userLoginId: string;
  onLoadData: (val: any) => void;
  allData: any[];
}) {
  const router = useRouter();
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [postingId, setPostingId] = useState("");

  return (
    <>
    {/* <pre>{JSON.stringify(data, null,2)}</pre> */}
      <Card mb={"md"}>
        <Card.Section>
          <ComponentForum_V2_HeaderCard
            data={data}
            isMoreButton={true}
            userLoginId={userLoginId}
            onLoadData={onLoadData}
            allData={allData}
          />
        </Card.Section>

        <Card.Section
          sx={{ zIndex: 0 }}
          p={"lg"}
          onClick={() => {
            router.push(RouterForum.main_detail + data?.id);
          }}
        >
          <Text fz={"sm"} lineClamp={4}>
            <div dangerouslySetInnerHTML={{ __html: data?.diskusi }} />
          </Text>
        </Card.Section>

        <Card.Section>
          <Stack>
            <Group spacing={"xs"} px={"sm"}>
              <ActionIcon
                loading={loadingKomen && data?.id === postingId ? true : false}
                variant="transparent"
                sx={{ zIndex: 1 }}
                // onClick={() => {
                //   setPostingId(data?.id),
                //     (data?.ForumMaster_StatusPosting.id as any) === 1
                //       ? (router.push(RouterForum.komentar + data?.id),
                //         setLoadingKomen(true))
                //       : router.push(RouterForum.main_detail + data?.id);
                // }}
              >
                {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                  <IconMessageCircle color="gray" size={25} />
                ) : (
                  <IconMessageCircleX color="gray" size={25} />
                )}
              </ActionIcon>

              {/* <TotalKomentar postingId={e?.id} /> */}

              <Text c={"gray"}>{data?.Forum_Komentar.length}</Text>
            </Group>
            <Divider />
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
