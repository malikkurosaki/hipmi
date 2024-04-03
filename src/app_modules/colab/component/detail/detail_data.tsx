"use client"

import { Stack, Box, Center, Title, Grid, Text } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";

export default function ComponentColab_DetailData() {
  return (
    <>
      <Stack>
        <Box>
          <Center px={"md"} mb={"lg"} >
            <Title order={4}>Judul Proyek </Title>
          </Center>
          <Stack spacing={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"} fz={"sm"}>
                  Industri
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text fz={"sm"}>Industri</Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"} fz={"sm"}>
                  Lokasi
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text fz={"sm"} lineClamp={1}>
                  Lokasi dari proyek{" "}
                </Text>
              </Grid.Col>
            </Grid>

            <Stack spacing={5}>
              <Text fw={"bold"} fz={"sm"}>
                Tujuan proyek
              </Text>
              <Text fz={"sm"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                repudiandae nostrum temporibus velit possimus, voluptate
                inventore recusandae hic ipsa praesentium deserunt, fuga
                asperiores doloremque amet incidunt explicabo ea eius earum.
              </Text>
            </Stack>
            <Stack spacing={5}>
              <Text fw={"bold"} fz={"sm"}>
                Keutungan
              </Text>
              <Text fz={"sm"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                repudiandae nostrum temporibus velit possimus, voluptate
                inventore recusandae hic ipsa praesentium deserunt, fuga
                asperiores doloremque amet incidunt explicabo ea eius earum.
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}