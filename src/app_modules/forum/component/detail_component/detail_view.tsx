"use client";

import { Card, Stack, Group, Text } from "@mantine/core";
import { IconMessageCircle, IconMessageCircleX } from "@tabler/icons-react";
import { MODEL_FORUM_POSTING } from "../../model/interface";
import ComponentForum_DetailHeader from "./detail_header";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function ComponentForum_DetailForumView({
  data,
  totalKomentar,
  userLoginId,
  onLoadData,
}: {
  data: MODEL_FORUM_POSTING;
  totalKomentar: number;
  userLoginId: string;
  onLoadData: (val: any) => void;
}) {
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
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {/* HEADER */}
        <Card.Section>
          <ComponentForum_DetailHeader
            data={data}
            userLoginId={userLoginId}
            onLoadData={(val) => {
              onLoadData(val);
            }}
          />
        </Card.Section>

        {/* CONTENT */}
        <Card.Section sx={{ zIndex: 0 }} p={"lg"}>
          <Stack spacing={"xs"}>
            <Text fz={"sm"} color="white">
              {data?.diskusi ? (
                <div dangerouslySetInnerHTML={{ __html: data?.diskusi }} />
              ) : (
                ""
              )}
            </Text>
          </Stack>
        </Card.Section>

        {/* FOOTER */}
        <Card.Section>
          <Stack>
            <Group position="apart">
              <Group spacing={"xs"} px={"sm"}>
                {(data?.ForumMaster_StatusPosting?.id as any) === 1 ? (
                  <IconMessageCircle color="white" size={25} />
                ) : (
                  <IconMessageCircleX color="gray" size={25} />
                )}
                <Text
                  c={
                    (data?.ForumMaster_StatusPosting?.id as any) === 1
                      ? "white"
                      : "gray"
                  }
                >
                  {totalKomentar}
                </Text>
              </Group>
              <Group>
                <Text c={"white"} fz={"sm"}>
                  {new Date(data?.createdAt).toLocaleTimeString()}
                  {/* {new Intl.RelativeTimeFormat("id", {style: "short"}).format(-1,"day")} */}
                </Text>
                <Text c={"white"} fz={"sm"}>
                  {data?.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })
                    : new Date().toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
