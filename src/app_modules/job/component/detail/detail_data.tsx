"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import {
  Card,
  Center,
  Image,
  Skeleton,
  Stack,
  Text
} from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";

export default function ComponentJob_DetailData({
  data,
}: {
  data?: MODEL_JOB;
}) {

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      {data ? (
        <Card
          shadow="lg"
          withBorder
          p={30}
          style={{
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          }}
          c={"white"}
        >
          <Card.Section px={"xs"} pb={"lg"}>
            <Stack spacing={"xl"}>
              {data.imageId && (
                <ComponentGlobal_LoadImage fileId={data?.imageId} />
              )}

              <Stack>
                <Center>
                  <Text fz={20} fw={"bold"}>
                    {data.title}
                  </Text>
                </Center>
                <Stack spacing={0}>
                  <Text>
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  </Text>
                  <Text>
                    <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Section>
        </Card>
      ) : (
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
      )}
    </>
  );
}
