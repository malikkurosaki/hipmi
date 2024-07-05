"use client";

import { Stack, Loader, ActionIcon, ThemeIcon } from "@mantine/core";
import ComponentGlobal_UI_LayoutTamplate from "../ui/ui_layout_tamplate";
import { IconMessages, IconX } from "@tabler/icons-react";

export default function ComponentGlobal_SplashScreen({ icon }: { icon: any }) {
  return (
    <>
      <ComponentGlobal_UI_LayoutTamplate>
        <Stack h={"90vh"} align="center" justify="center" spacing={"xl"}>
          <ThemeIcon variant="transparent" size={300} c="white">
            {icon}
          </ThemeIcon>
          <Loader variant="dots" color="white" />
        </Stack>
      </ComponentGlobal_UI_LayoutTamplate>
    </>
  );
}
