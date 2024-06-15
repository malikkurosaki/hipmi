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

export default function ComponentVote_DetailDataSebelumPublish
({
  data,
}: {
  data?: MODEL_VOTING;
}) {

  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section px={"xs"}>
          <Stack spacing={"lg"}>
            <Center>
              <Title order={5}>{data?.title}</Title>
            </Center>
            <Text>{data?.deskripsi}</Text>

            <Stack spacing={0}>
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
        <Card.Section py={40}>
          <Text fz={10} fw={"bold"}>
            Pilihan :
          </Text>
          <Stack spacing={"xs"}>
            {data?.Voting_DaftarNamaVote.map((e) => (
              <Group key={e.id}>
                <Text>
                  <IconCircle size={10} />
                </Text>
                <Text truncate>{e.value}</Text>
              </Group>
            ))}
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
