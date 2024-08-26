"use client";

import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, Box, Container, Group, Header, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Investasi_ViewFileViewer } from "../_view";

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

          <Investasi_ViewFileViewer
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
