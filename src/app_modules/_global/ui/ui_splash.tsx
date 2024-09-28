"use client";

import { Loader, Stack, ThemeIcon } from "@mantine/core";
import UIGlobal_LayoutTamplate from "./ui_layout_tamplate";

export default function UIGlobal_SplashScreen({ icon }: { icon: any }) {
  return (
    <>
      <UIGlobal_LayoutTamplate>
        <Stack h={"90vh"} align="center" justify="center" spacing={"xl"}>
          <ThemeIcon variant="transparent" size={300} c="white">
            {icon}
          </ThemeIcon>
          <Loader variant="dots" color="white" />
        </Stack>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
