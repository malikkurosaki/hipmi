"use client";

import {
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImage,
  ComponentGlobal_NotUserLoadImage,
} from "@/app_modules/_global/component";
import {
  Card,
  Center,
  Image,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MODEL_JOB } from "../../model/interface";

export default function ComponentJob_NotUserDetailData({
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
              <ComponentGlobal_NotUserLoadImage fileId={data?.imageId} />
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
            <Title order={3} align="center">
              Data Not Found
            </Title>
          </Stack>
        </ComponentGlobal_CardStyles>
      )}
    </>
  );
}
