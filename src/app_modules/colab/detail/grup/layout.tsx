"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import {
  ActionIcon,
  Box,
  Center,
  Grid,
  Group,
  Header,
  Stack,
  Title
} from "@mantine/core";
import {
  IconChevronLeft,
  IconInfoSquareRounded
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MODEL_COLLABORATION_ROOM_CHAT } from "../../model/interface";

export default function LayoutColab_DetailGrupDiskusi({
  children,
  dataRoom,
}: {
  children: React.ReactNode;
  dataRoom: MODEL_COLLABORATION_ROOM_CHAT;
}) {
  const router = useRouter();
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  return (
    <>
      <Box>
        {/* Header */}
        <Box
          style={{
            zIndex: 99,
          }}
          w={"100%"}
          bg={"black"}
          pos={"fixed"}
          top={0}
          h={50}
        >
          {/* <ComponentColab_HeaderTamplate
            title={dataRoom.name + " " + "fwf wfwe efewf wef"}
            bg={"gray.2"}
            icon={<IconInfoSquareRounded />}
            route2={RouterColab.info_grup + dataRoom?.id}
          /> */}
          <Header height={50} sx={{ borderStyle: "none" }} bg={"gray.2"}>
            <Stack h={50} justify="center" px={"sm"}>
              <Grid grow gutter={"lg"}>
                <Grid.Col span={2}>
                  <ActionIcon
                    loading={loadingBack ? true : false}
                    variant="transparent"
                    radius={"xl"}
                    onClick={() => {
                      setLoadingBack(true);
                      router.back();
                    }}
                  >
                    <IconChevronLeft />
                  </ActionIcon>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Center>
                    <Title order={5} lineClamp={1}>
                      {dataRoom.name}
                    </Title>
                  </Center>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Group position="right">
                    <ActionIcon
                      loading={loadingInfo ? true : false}
                      variant="transparent"
                      radius={"xl"}
                      onClick={() => {
                        setLoadingInfo(true);
                        router.push(RouterColab.info_grup + dataRoom?.id);
                      }}
                    >
                      <IconInfoSquareRounded />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
            {/* <Group position="apart" px={"sm"} h={"100%"}>
              <ActionIcon>
                <IconChevronLeft />
              </ActionIcon>
              <Box w={width > 375 ? 300 : 200}>
                <Text truncate>ff fsafsdfdaf sadsadf asdfda ewfw wefewf</Text>
              </Box>
              <ActionIcon>
                <IconInfoSquareRounded />
              </ActionIcon>
            </Group> */}
          </Header>
        </Box>

        {/* Children */}
        <Box py={"xs"} px={"xs"} pos={"static"}>
          <Box
            style={{
              height: 50,
            }}
          ></Box>
          <Stack>
            {children}
            <Box
              style={{
                height: "10vh",
              }}
            ></Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
