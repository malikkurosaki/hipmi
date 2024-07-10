"use client";

import {
  BackgroundImage,
  Box,
  Container,
  Footer,
  rem,
  ScrollArea,
} from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";
import React from "react";

export default function UIGlobal_LayoutTamplate({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
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
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue} >
          <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            style={{ position: "relative" }}
          >
            <UIHeader header={header} />

            <UIChildren footer={footer}>{children}</UIChildren>

            <UIFooter footer={footer} />
          </BackgroundImage>
        </Container>
      </Box>
    </>
  );
}

function UIHeader({ header }: { header: React.ReactNode }) {
  return (
    <>
      {header ? (
        <Box
          h={"8vh"}
          style={{
            zIndex: 10,
          }}
          w={"100%"}
          pos={"sticky"}
          top={0}
        >
          {header}
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

function UIChildren({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <>
      <Box style={{ zIndex: 0 }} h={footer ? "82vh" : "92vh"} pos={"static"}>
        <ScrollArea h={"100%"} px={"md"}>
          {children}
        </ScrollArea>
      </Box>
    </>
  );
}

function UIFooter({ footer }: { footer: React.ReactNode }) {
  return (
    <>
      {footer ? (
        <Box
          style={{
            position: "relative",
            bottom: 0,
            height: "10vh",
            zIndex: 10,
            borderRadius: "20px 20px 0px 0px",
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
          }}
          bg={AccentColor.darkblue}
        >
          <Box
            h={"100%"}
            style={{
              borderRadius: "20px 20px 0px 0px",
              width: "100%",
            }}
            pos={"absolute"}
          >
            {footer}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
