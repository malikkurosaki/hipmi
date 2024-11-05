"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImage,
} from "@/app_modules/_global/component";
import { Box, Center, Skeleton, Stack, Text } from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";

export default function ComponentJob_DetailData({
  data,
}: {
  data?: MODEL_JOB;
}) {
  return (
    <>
      {data ? (
        <ComponentGlobal_CardStyles>
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
        </ComponentGlobal_CardStyles>
      ) : (
        <ComponentGlobal_CardStyles>
          <Stack spacing={"xl"}>
            <Stack align="center">
              <Skeleton h={250} w={200} radius="md" />
              <Skeleton h={10} w={200} />
            </Stack>

            {Array.from(new Array(2)).map((e, i) => (
              <Stack key={i}>
                <Skeleton h={10} w={100} />

                {Array.from({ length: 3 }).map((_, ii) => (
                  <Skeleton h={10} key={ii} />
                ))}
              </Stack>
            ))}
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
    </>
  );
}
