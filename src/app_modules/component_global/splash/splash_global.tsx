"use client";

import { Stack, Loader, ActionIcon, ThemeIcon } from "@mantine/core";
import LayoutGlobal_UI_Tamplate from "../ui/ui_layout_tamplate";
import { IconMessages, IconX } from "@tabler/icons-react";

export default function ComponentGlobal_SplashScreen({ icon }: { icon: any }) {
  return (
    <>
      <LayoutGlobal_UI_Tamplate>
        <Stack h={"90vh"} align="center" justify="center" spacing={"xl"}>
          <ThemeIcon variant="transparent" size={300} c="white">
            {icon}
          </ThemeIcon>
          <Loader variant="dots" color="white" />
        </Stack>
      </LayoutGlobal_UI_Tamplate>
    </>
  );
}
