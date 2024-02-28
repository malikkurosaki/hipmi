"use client";

import { Card, Center, Image, Stack, Text } from "@mantine/core";
import ComponentJob_DetailData from "../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { data } from "autoprefixer";
import { MODEL_JOB } from "../model/interface";

export default function Job_NonUserView({ data }: { data: MODEL_JOB }) {
  return (
    <>
      <Center>
        <Card shadow="lg" withBorder p={30} w={{ base: 400 }}>
          <Card.Section px={"xs"} pb={"lg"}>
            <Stack spacing={"xl"}>
              {data.imagesId ? (
                <Stack align="center">
                  <Image
                    radius={"sm"}
                    alt=""
                    src={
                      data.imagesId ? RouterJob.api_gambar + data.imagesId : ""
                    }
                    height={300}
                    width={200}
                  />
                </Stack>
              ) : (
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
      </Center>
    </>
  );
}
