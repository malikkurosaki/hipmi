"use client";

import {
  Avatar,
  Box,
  Card,
  Center,
  Grid,
  Group,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MODEL_VOTING_DAFTAR_NAMA_VOTE } from "../../model/interface";

export default function ComponentVote_HasilVoting({
  data,
}: {
  data?: MODEL_VOTING_DAFTAR_NAMA_VOTE[];
}) {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Hasil Voting</Title>
            </Center>

            <Grid justify="center">
              {data?.map((e) => (
                <Grid.Col key={e.id} span={data?.length >= 4 ? 6 : 4}>
                  <Stack align="center">
                    <Avatar
                      radius={100}
                      size={70}
                      variant="outline"
                      color="blue"
                    >
                      <Text> {e.jumlah}</Text>
                    </Avatar>
                    <Text fz={"xs"}>{e.value}</Text>
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
