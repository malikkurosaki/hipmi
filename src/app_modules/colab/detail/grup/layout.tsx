"use client";

import {
  ActionIcon,
  AppShell,
  Box,
  Center,
  Footer,
  Grid,
  Group,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import ComponentColab_HeaderTamplate from "../../component/header_tamplate";
import { IconPlane, IconSend } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_colab_pesan } from "../../global_state";
import AppComponentGlobal_LayoutTamplate from "@/app_modules/component_global/component_layout_tamplate";

export default function LayoutColab_DetailGrupDiskusi({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <ComponentColab_HeaderTamplate title="Room Chat" bg={"gray.2"} />
        </Box>

        {/* Children */}
        <Box p={"sm"} pos={"static"} h={"80vh"}>
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
