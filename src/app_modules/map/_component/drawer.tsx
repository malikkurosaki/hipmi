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
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { MODEL_MAP } from "../lib/interface";
import { useShallowEffect } from "@mantine/hooks";
import { ComponentMap_DetailData } from "./detail_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";

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
}: {
  opened: boolean;
  close: () => void;
  mapId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MODEL_MAP>();

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
            <Title order={5}>Detail Map</Title>
            <ActionIcon onClick={close} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          </Group>
          <Suspense fallback={<ComponentGlobal_Loader />}>
            <ComponentMap_DetailData mapId={mapId} />
          </Suspense>
        </Stack>
      </Drawer>
    </>
  );
}
