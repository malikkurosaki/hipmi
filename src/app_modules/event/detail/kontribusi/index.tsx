"use client";

import {
  Avatar,
  Center,
  Divider,
  Grid,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ComponentEvent_DetailData from "../../component/detail_data";

export default function Event_DetailKontribusi() {
  return (
    <>
      <Stack spacing={"lg"}>
        <ComponentEvent_DetailData />
        <Paper withBorder mt={"lg"} shadow="lg">
          <Stack spacing={"md"} p={"md"}>
            <Center>
              <Title order={5}>Daftar Peserta</Title>
            </Center>

            {Array(10)
              .fill(0)
              .map((e, i) => (
                <Stack key={i} spacing={"sm"}>
                  <Grid>
                    <Grid.Col span={2}>
                      <Avatar radius={"xl"} bg={"gray"} size={"md"} />
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                      <Stack justify="center" h={"100%"}>
                        <Text>Nama peserta</Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                  <Divider />
                </Stack>
              ))}
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}