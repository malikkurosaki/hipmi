"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import {
  BackgroundImage,
  Box,
  Container,
  Footer,
  rem,
  ScrollArea,
} from "@mantine/core";
import React from "react";

export function Notifikasi_UiLayout({
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
          backgroundColor: MainColor.black,
          overflowX: "auto",
          overflowY: "auto",
          position: "fixed",
        }}
      >
        <Container mih={"100vh"} p={0} size={rem(500)} bg={MainColor.darkblue}>
          <BackgroundImage
            src={"/aset/global/main_background.png"}
            h={"100vh"}
            style={{ position: "relative" }}
          >
            <UIHeader header={header} />

            <UIChildren footer={footer}>{children}</UIChildren>
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
      <Box style={{ zIndex: 0 }} h={"92vh"} px={"md"} pos={"static"}>
        {children}
        {/* <ScrollArea h={"100%"} px={"md"}>
        </ScrollArea> */}
      </Box>
    </>
  );
}


