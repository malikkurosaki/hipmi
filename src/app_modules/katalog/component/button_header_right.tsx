"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import ComponentGlobal_UI_Drawer from "@/app_modules/component_global/ui/ui_drawer";
import { ActionIcon, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconPhotoEdit,
  IconPolaroid,
} from "@tabler/icons-react";
import { ComponentKatalog_DrawerKatalog } from "./drawer_katalog";

export function ComponentKatalog_ButtonHeaderRight({
  profileId,
  userLoginId,
  authorId,
}: {
  profileId: string;
  userLoginId: string;
  authorId: string;
}) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      {authorId !== userLoginId ? (
        <ActionIcon disabled variant="transparent"></ActionIcon>
      ) : (
        <ActionIcon c="white" variant="transparent" onClick={() => open()}>
          <IconDotsVertical />
        </ActionIcon>
      )}

      <ComponentKatalog_DrawerKatalog
        opened={opened}
        close={() => close()}
        profileId={profileId}
      />
    </>
  );
}
