"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentInvestasi_FrameFileView } from "../_component";
import { MODEl_PROSPEKTUS_INVESTASI } from "../_lib/interface";
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { ActionIcon, Box, Container, Group, Header, rem } from "@mantine/core";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { IconChevronLeft, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function Investasi_UiFileView({ prospekId }: { prospekId: string }) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="File" />}
      >
        <ComponentInvestasi_FrameFileView fileId={prospekId} path={RouterInvestasi_OLD.api_file_prospektus} />
      </UIGlobal_LayoutTamplate> */}
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          overflowY: "auto",
          overflowX: "auto",
          backgroundColor: MainColor.black,
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.black}>
          <HeaderView />

          <ComponentInvestasi_FrameFileView
            fileId={prospekId}
            path={RouterInvestasi_OLD.api_file_prospektus}
          />
        </Container>
      </Box>
    </>
  );
}

function HeaderView() {
  const router = useRouter();
  return (
    <>
      <Header
        height={"8vh"}
        sx={{
          borderStyle: "none",
        }}
        bg={"white"}
      >
        <Group position="right" align="center" h={"100%"} px={"md"}>
          <ActionIcon onClick={() => router.back()}>
            <IconX />
          </ActionIcon>
        </Group>
      </Header>
    </>
  );
}
