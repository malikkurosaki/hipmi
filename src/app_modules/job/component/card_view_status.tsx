"use client";

import { Stack, Card, Grid, Image, Text } from "@mantine/core";
import _ from "lodash";
import ComponentJob_IsEmptyData from "./is_empty_data";
import { useRouter } from "next/navigation";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/component_global/notif_global/notifikasi_peringatan";

export default function ComponentJob_CardViewStatus({
  listData,
  path,
}: {
  listData?: any[];
  path?: any;
}) {
  const router = useRouter();
  if (_.isEmpty(listData))
    return (
      <>
        <ComponentJob_IsEmptyData text="Data tidak ada" />
      </>
    );

  return (
    <>
      <Stack>
        {listData?.map((e, i) => (
          <Card
            key={i}
            shadow="lg"
            withBorder
            radius={"md"}
            onClick={() => {
              if (path === undefined) {
                return ComponentGlobal_NotifikasiPeringatan(
                  "Path tidak ditemukan"
                );
              } else {
                router.push(path);
              }
            }}
          >
            <Card.Section>
              <Grid>
                <Grid.Col span={6}>
                  <Image alt="foto" src={"/aset/no-file.png"} />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack justify="center" h={"100%"}>
                    <Text fw={"bold"} fz={20} truncate>
                      Judul Lowongan Kerja
                    </Text>
                    <Text lineClamp={3}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laboriosam est id neque iste voluptatem consequuntur
                      veritatis dolorem illo et, repellat praesentium maiores
                      amet omnis voluptas aliquid tenetur nam sint obcaecati.
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Card.Section>
          </Card>
        ))}
      </Stack>
    </>
  );
}
