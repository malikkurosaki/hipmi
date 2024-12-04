"use client";

import { Divider, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";

export default function AdminMain({
  countUser,
  countPorto,
}: {
  countUser: number;
  countPorto: number;
}) {
  const listBox = [
    {
      id: 1,
      name: "User",
      jumlah: countUser,
      link: "",
      color: "green",
    },
    {
      id: 2,
      name: "Portofolio",
      jumlah: countPorto,
      link: "",
      color: "orange",
    },
  ];

  return (
    <>
      <Stack spacing={"sm"}>
        <Title>Main Dashboard</Title>
        <Divider mb={"md"} />

        <Grid>
          {listBox.map((e) => (
            <Grid.Col md={4} lg={4} key={e.id}>
              <Paper withBorder shadow="md" radius="md" p="md">
                <Group position="center">
                  <Stack align="center" spacing={0}>
                    <Text>{e.name}</Text>
                    <Title>{e.jumlah}</Title>
                  </Stack>
                </Group>
              </Paper>
            </Grid.Col>
          ))}

          <Grid.Col md={4} lg={4}>
            {/* <PieChart /> */}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
