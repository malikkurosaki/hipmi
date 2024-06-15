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
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/component_global/author_name_on_header";

export default function ComponentVote_DetailDataSetelahPublish({
  data,
  authorName,
}: {
  data?: MODEL_VOTING;
  authorName?: boolean;
}) {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
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
              <Title order={5}>{data?.title}</Title>
            </Center>
            <Text>{data?.deskripsi}</Text>

            <Stack spacing={0} pb={authorName ? 0 : "xs"}>
              <Center>
                <Text fz={10} fw={"bold"}>
                  Batas Voting
                </Text>
              </Center>
              <Badge>
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
        </Card.Section>
      </Card>
    </>
  );
}
