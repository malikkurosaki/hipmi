"use client";
import {
  Card,
  Stack,
  Center,
  Title,
  Badge,
  Group,
  Radio,
  Grid,
  Text,
} from "@mantine/core";
import moment from "moment";
import { MODEL_VOTING } from "../../model/interface";
import { IconCircle } from "@tabler/icons-react";
import _ from "lodash";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentVote_DetailDataSetelahPublish({
  data,
  authorName,
}: {
  data?: MODEL_VOTING;
  authorName?: boolean;
}) {
  return (
    <>
      <Card
        p={30}
        style={{
          backgroundColor: AccentColor.darkblue,
          borderRadius: "10px",
          border: `2px solid ${AccentColor.blue}`,
          color: "white",
        }}
      >
        {authorName ? (
          <Card.Section>
            <ComponentGlobal_AuthorNameOnHeader
              authorName={data?.Author.Profile.name}
              imagesId={data?.Author.Profile.imagesId}
              profileId={data?.Author.Profile.id}
            />
          </Card.Section>
        ) : (
          ""
        )}
        <Card.Section px={"xs"} py={authorName ? "sm" : 0}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={4} align="center">
                {data?.title}
              </Title>
            </Center>
            <Text>{data?.deskripsi}</Text>

            <Stack spacing={0} pb={authorName ? 0 : "xs"}>
              <Stack align="center" spacing={"xs"}>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>
                <Badge
                  styles={{
                    root: {
                      backgroundColor: AccentColor.blue,
                      border: `1px solid ${AccentColor.skyblue}`,
                      color: "white",
                      width: "80%",
                    },
                  }}
                >
                  <Group>
                    <Text>
                      {data?.awalVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                    <Text>-</Text>
                    <Text>
                      {data?.akhirVote.toLocaleDateString(["id-ID"], {
                        dateStyle: "medium",
                      })}
                    </Text>
                  </Group>
                </Badge>
              </Stack>
            </Stack>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
