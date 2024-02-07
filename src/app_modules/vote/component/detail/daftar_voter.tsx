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
  Avatar,
  Divider,
} from "@mantine/core";
import moment from "moment";

export default function ComponentVote_DaftarVoter() {
  return (
    <>
      <Card shadow="lg" withBorder p={30}>
        <Card.Section>
          <Stack>
            <Center>
              <Title order={5}>Daftar Voting</Title>
            </Center>
            {Array(5)
              .fill(0)
              .map((e, i) => (
                <Stack spacing={"xs"} key={i}>
                  <Grid>
                    <Grid.Col span={2}>
                      <Avatar radius={"xl"} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Stack justify="center" h={"100%"}>
                        <Text truncate>Nama User</Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Stack justify="center" h={"100%"}>
                        <Text truncate>A</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
}
