"use client";

import { Card, Center, Divider, Grid, Stack, Text } from "@mantine/core";

export default function ComponentColab_JumlahPartisipan({
  jumlah,
}: {
  jumlah?: any[];
}) {
  return (
    <>
      <Card.Section px={"md"} >
        <Stack>
          <Divider />
          <Center>
            <Grid>
              <Grid.Col span={"content"}>
                <Text c={"white"} fz={"xs"} fw={"bold"}>
                  {jumlah?.length ? jumlah?.length : 0}
                </Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text c={"white"} fz={"xs"} fw={"bold"}>
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
