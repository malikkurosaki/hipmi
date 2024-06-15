"use client";

import { Stack, Divider, Center, Text, Grid, Card } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";

export default function ComponentColab_JumlahPartisipan({
  jumlah,
}: {
  jumlah?: any[];
}) {
  return (
    <>
      <Card.Section px={"md"}>
        <Stack>
          <Divider />
          <Center>
            <Grid>
              <Grid.Col span={"content"}>
                <Text c={"gray"} fz={"xs"} fw={"bold"}>
                  {jumlah?.length ? jumlah?.length : 0}
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
      </Card.Section>
    </>
  );
}
