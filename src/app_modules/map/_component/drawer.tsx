"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import {
  ActionIcon,
  Drawer,
  Group,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { map_funGetOneById } from "../fun/get/fun_get_one_by_id";
import { MODEL_MAP } from "../lib/interface";

interface MODEL_DRAWER {
  id: string;
  name: string;
  icon: string;
  path: string;
}
export function ComponentMap_DrawerDetailData({
  opened,
  close,
  mapId,
  component,
}: {
  opened: boolean;
  close: () => void;
  mapId: string;
  component: React.ReactNode;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadData(mapId);
  }, [mapId]);

  async function onLoadData(mapId: string) {
    const res: any = await map_funGetOneById({ mapId: mapId });
    if (res !== null) {
      setData(res);
    }
  }

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => close()}
        position={"bottom"}
        size={"auto"}
        withCloseButton={false}
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
      >
        <Stack spacing={"xs"}>
          <Group position="apart">
            <Title order={5}>
              {data?.namePin ? (
                data?.namePin
              ) : (
                <Skeleton radius={"xl"} w={100} />
              )}
            </Title>
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          {component}
        </Stack>
      </Drawer>
    </>
  );
}
