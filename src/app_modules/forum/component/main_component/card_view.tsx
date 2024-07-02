"use client";

import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/component_global/color/color_pallet";
import { ActionIcon, Card, Group, Stack, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_BerandaHeaderCard from "./card_header";

export default function ComponentForum_BerandaCardView({
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
      <Card
        mb={"md"}
        p={"xl"}
        bg={MainColor.darkblue}
        style={{
          border: `2px solid ${AccentColor.blue}`,
        }}
        radius={"md"}
      >
        <Card.Section>
          <ComponentForum_BerandaHeaderCard
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
          <Text c="white" fz={"sm"} lineClamp={4}>
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
              >
                {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                  <IconMessageCircle color="white" size={25} />
                ) : (
                  <IconMessageCircleX color="gray" size={25} />
                )}
              </ActionIcon>

              {/* <TotalKomentar postingId={e?.id} /> */}

              <Text color={(data?.ForumMaster_StatusPosting?.id as any) === 1 ? "white" :"gray"}>{data?.Forum_Komentar.length}</Text>
            </Group>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
