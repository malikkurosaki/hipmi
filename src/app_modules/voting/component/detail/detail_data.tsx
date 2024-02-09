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

export default function ComponentVote_DetailData({
  data,
}: {
  data?: MODEL_VOTING;
}) {
  const listVote = [
    {
      id: 1,
      value: "A",
      label: "A",
    },
    {
      id: 2,
      value: "B",
      label: "B",
    },
  ];
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
          <Stack>
            <Radio.Group>
              <Grid>
                {data?.Voting_DaftarNamaVote.map((e) => (
                  <Grid.Col key={e.id} span={"auto"}>
                    <Center>
                      <Radio
                        value={e.value}
                        label={<Text fw={"bold"}>{e.value}</Text>}
                      />
                    </Center>
                  </Grid.Col>
                ))}
              </Grid>
            </Radio.Group>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
