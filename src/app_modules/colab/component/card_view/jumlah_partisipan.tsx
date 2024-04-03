"use client";

import { Stack, Divider, Center, Text, Grid } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";

export default function ComponentColab_JumlahPartisipan() {
  return (
    <>
      <Stack>
        <Divider />
        <Center>
          <Grid >
            <Grid.Col span={"content"}>
              <Text c={"gray"} fz={"xs"} fw={"bold"}>
                12
              </Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text c={"gray"} fz={"xs"} fw={"bold"}>
                Partisipan
              </Text>
            </Grid.Col>
          </Grid>
        </Center>
      </Stack>
    </>
  );
}
