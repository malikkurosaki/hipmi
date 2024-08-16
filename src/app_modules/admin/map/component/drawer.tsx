"use client";

import { Drawer, Group, Text } from "@mantine/core";
import { ComponentAdmin_UIDrawerNotifikasi } from "../../notifikasi/ui_drawer_notifikasi";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";

export function ComponentAdminMap_Drawer({
  opened,
  onClose,
  data,
}: {
  opened: boolean;
  onClose: () => void;
  data: MODEL_MAP | any;
}) {
  return (
    <>
      <Drawer
        title={
          <Group position="apart">
            <Text fw={"bold"} fz={"lg"}>
              Detail Map
            </Text>
          </Group>
        }
        opened={opened}
        onClose={onClose}
        position="right"
        size={"xs"}
        transitionProps={{transition: "fade", duration: 500}}
      >
        <Text>Detail Map</Text>
        <Text>{data}</Text>
      </Drawer>
    </>
  );
}
