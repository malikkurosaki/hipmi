"use client";

import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
import {
  Box,
  Center,
  Title,
  SimpleGrid,
  Loader,
  Stack,
  ActionIcon,
  Avatar,
  Text,
} from "@mantine/core";
import { IconUserSearch, IconUserCircle } from "@tabler/icons-react";
import router from "next/router";
import { ComponentGlobal_NotifikasiPeringatan } from "./notif_global/notifikasi_peringatan";

export default function AppComponentGlobal_LayoutTamplate({
  children,
  header,
  footer,
}: {
  children: any;
  header?: any;
  footer?: any;
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
          pos={"sticky"}
          top={0}
          h={50}
        >
          {header}
        </Box>

        {/* Children */}
        <Box p={"sm"} pos={"static"}>
          <Stack>
            
            {children}
            <Box
              style={{
                height: "10vh",
              }}
            ></Box>
          </Stack>
        </Box>

        {/* Footer */}
       {footer ?  <Box
          style={{
            zIndex: 98,
          }}
          w={"100%"}
          bg={"black"}
          pos={"fixed"}
          bottom={0}
          h={"10vh"}
        >
          {footer}
        </Box> : ""}
      </Box>
    </>
  );
}
