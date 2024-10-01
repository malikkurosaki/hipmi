"use client";

import {
  BackgroundImage,
  Box,
  Container,
  rem,
  ScrollArea,
} from "@mantine/core";
import { MainColor } from "../color";

export default function UIGlobal_LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            style={{ position: "relative" }}
          >
            <Box style={{ zIndex: 0 }} h={"100vh"} pos={"static"}>
              <ScrollArea h={"100%"} px={"md"}>
                {children}
              </ScrollArea>
            </Box>
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}
