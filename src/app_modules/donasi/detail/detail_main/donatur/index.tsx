"use client";

import {
  Avatar,
  Center,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { size } from "lodash";
import moment from "moment";

export default function DonaturDonasi() {
  return (
    <>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {Array(10)
          .fill(0)
          .map((e, i) => (
            <Paper key={i} bg={"gray.1"} p={"sm"}>
              <Grid>
                <Grid.Col span={3}>
                  <Center h={"100%"}>
                    <Avatar variant="filled" radius={"xl"} size={"md"} />
                  </Center>
                </Grid.Col>
                <Grid.Col span={9}>
                  <Stack spacing={0}>
                    <Title order={5}>Orang Baik</Title>
                    <Group spacing={"xs"}>
                      <Text>Berdonasi sebesar</Text>
                      <Text truncate fw={"bold"}>
                        Rp. 50.000
                      </Text>
                    </Group>
                    <Text fz={"xs"}>{moment(Date.now()).format("ll")}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
      </SimpleGrid>
    </>
  );
}
