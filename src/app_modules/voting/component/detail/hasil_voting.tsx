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

export default function ComponentVote_HasilVoting() {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Hasil Voting</Title>
            </Center>
            {/* <Group position="center">
              <Group>
                <Text>
                  Voting A :{" "}
                  <Text span inherit fw={"bold"}>
                    10
                  </Text>
                </Text>
              </Group>
              <Group>
                <Text>
                  Voting B :{" "}
                  <Text span inherit fw={"bold"}>
                    12
                  </Text>
                </Text>
              </Group>
            </Group> */}
            <Grid>
              <Grid.Col span={6}>
                <Stack align="center">
                  <Avatar
                    radius={100}
                    size={100}
                    variant="outline"
                    color="blue"
                  >
                    2
                  </Avatar>
                  <Text>Voting A</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack align="center">
                  <Avatar
                    radius={100}
                    size={100}
                    variant="outline"
                    color="red"
                  >
                    3
                  </Avatar>
                  <Text>Voting B</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
