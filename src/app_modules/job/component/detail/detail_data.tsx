"use client"

import { Card, Stack, Skeleton, Image, Text } from "@mantine/core";


export default function ComponentJob_DetailData(){
    return (
      <>
        <Card shadow="lg" withBorder p={30}>
          <Card.Section px={"xs"} pb={"lg"}>
            <Stack spacing={"xl"}>
              <Stack align="center">
                <Image alt="" src={"/aset/no-file.png"} mah={500} maw={200} />
                <Text fz={20} fw={"bold"}>
                  Judul Lowongan Kerja
                </Text>
              </Stack>

              <Stack>
                <Text fw={"bold"} fz={"xs"}>
                  Syarat & Ketentuan :
                </Text>
                <Stack>
                  {Array(5)
                    .fill(0)
                    .map((e, i) => (
                      <Skeleton key={i} height={8} radius="xl" />
                    ))}
                </Stack>
              </Stack>

              <Stack>
                <Text fw={"bold"} fz={"xs"}>
                  Deskripsi
                </Text>
                <Stack>
                  {Array(5)
                    .fill(0)
                    .map((e, i) => (
                      <Skeleton key={i} height={8} radius="xl" />
                    ))}
                </Stack>
              </Stack>
            </Stack>
          </Card.Section>
        </Card>
      </>
    );
}