"use client";

import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import {
  AspectRatio,
  Box,
  Drawer,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";
import { useState } from "react";
import { adminMap_funGetOneById } from "../fun/fun_get_one_by_id";
import _ from "lodash";
import { ComponentAdminMap_SkeletonDrawer } from "./comp_skeleton_drawer";
import { ComponentAdminMap_DetailDataDrawer } from "./comp_detail_data_drawer";

export function ComponentAdminMap_Drawer({
  opened,
  onClose,
  mapId,
}: {
  opened: boolean;
  onClose: () => void;
  mapId: string;
}) {
  const [data, setData] = useState<MODEL_MAP>();

  useShallowEffect(() => {
    onLoadMap(mapId);
  }, [mapId]);

  async function onLoadMap(mapId: string) {
    try {
      const res = await adminMap_funGetOneById({ mapId: mapId });
      setData(res as any);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              {data?.namePin}
            </Text>
          </Group>
        }
        opened={opened}
        onClose={onClose}
        position="right"
        size={"sm"}
      >
        {_.isEmpty(data) ? (
          <ComponentAdminMap_SkeletonDrawer />
        ) : (
          <ComponentAdminMap_DetailDataDrawer mapId={mapId} />
        )}

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Drawer>
    </>
  );
}
