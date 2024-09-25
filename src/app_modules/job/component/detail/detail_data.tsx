"use client";

import { APIs } from "@/app/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Card,
  Center,
  Image,
  Loader,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";
import { useState } from "react";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";

export default function ComponentJob_DetailData({
  data,
}: {
  data?: MODEL_JOB;
}) {
  const [isLoading, setIsLoading] = useState(true);

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
              {data.imageId ? (
                <ComponentGlobal_LoadImage
                  url={APIs.GET({ fileId: data?.imageId })}
                />
              ) : (
                // <Stack align="center">
                //   {isLoading ? (
                //     <Paper
                //       style={{ zIndex: 1, position: "relative" }}
                //       w={200}
                //       h={300}
                //       bg={AccentColor.blackgray}
                //     >
                //       <Center h={"100%"}>
                //         <ComponentGlobal_Loader size={30} variant="dots" />
                //       </Center>
                //     </Paper>
                //   ) : (
                //     ""
                //   )}

                //   <Image
                //     style={{ zIndex: 2, position: "relative" }}
                //     onLoad={() => {
                //       setIsLoading(false);
                //     }}
                //     onError={() => {
                //       setIsLoading(false);
                //     }}
                //     alt="Image"
                //     src={APIs.GET + data?.imageId}
                //     maw={200}
                //   />
                // </Stack>
                ""
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
