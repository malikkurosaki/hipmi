"use client";

import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import { ActionIcon } from "@mantine/core";
import {
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconId,
  IconPhotoEdit,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentPortofolio_ButtonMore({
  portoId,
  userLoginId,
  authorId,
}: {
  portoId: string;
  userLoginId: string;
  authorId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Update detail bisnis",
      icon: <IconEdit />,
      path: RouterPortofolio.edit_data_bisnis + `${portoId}`,
    },
    {
      id: "2",
      name: "Update logo ",
      icon: <IconPhotoEdit />,
      path: RouterPortofolio.edit_logo_bisnis + `${portoId}`,
    },
    {
      id: "3",
      name: "Update sosial media",
      icon: <IconId />,
      path: RouterPortofolio.edit_medsos_bisnis + `${portoId}`,
    },
  ];

  return (
    <>
      {userLoginId === authorId ? (
        <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
          <IconDotsVertical color="white" />
        </ActionIcon>
      ) : (
        <ActionIcon disabled variant="transparent"></ActionIcon>
      )}

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
