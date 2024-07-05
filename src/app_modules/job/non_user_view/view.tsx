"use client";

import { Card, Center, Image, Overlay, Stack, Text, Title } from "@mantine/core";
import ComponentJob_DetailData from "../component/detail/detail_data";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
import { data } from "autoprefixer";
import { MODEL_JOB } from "../model/interface";
import { AccentColor, MainColor } from "@/app_modules/component_global/color/color_pallet";

export default function Job_NonUserView({ data }: { data: MODEL_JOB }) {
  return (
    <>
      <Center my={"md"} >
        <Card
          shadow="lg"
          withBorder
          p={"xl"}
          // w={{ base: 400 }}
          style={{
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          }}
        >
          <Card.Section px={"xs"} pb={"lg"} c={"white"}>
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
          {data?.isArsip === true && (
            <Overlay color="gray" opacity={0.5} blur={1}>
              <Stack align="center" h={"100%"} justify="center">
                <Title c={"red"} fw={"bold"} order={3}>
                  Mohon Maaf !
                </Title>
                <Title c={"red"} fw={"bold"} order={3}>
                  Lowongan Kerja Ini Sudah Ditutup{" "}
                </Title>
              </Stack>
            </Overlay>
          )}
        </Card>
      </Center>
    </>
  );
}
