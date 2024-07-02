"use client";

import { BackgroundImage, Box, Center, ScrollArea } from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";
import ComponentGlobal_HeaderTamplate from "../header_tamplate";
import ComponentGlobal_UI_HeaderTamplate from "./ui_header_tamplate";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";

export default function ComponentGlobal_UI_LayoutTamplate({
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
      <BackgroundImage
        src={"/aset/global/main_background.png"}
        h={"100vh"}
      >
        {/* Header */}
        {header ? (
          <Box
            h={"8vh"}
            style={{
              zIndex: 98,
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

        {/* Children */}
        <Box h={footer ? "82vh" : "92vh"} pos={"static"}>
          <ScrollArea h={"100%"} px={"md"}>
            {/* {Array.from({ length: 100 }).map((e, i) => (
              <Box bg={"blue"} key={i} mb={"md"}>
                {i + 1}
              </Box>
            ))} */}
            {children}
          </ScrollArea>
        </Box>

        {/* Footer */}
        {footer ? (
          <Box
            style={{
              zIndex: 99,
              borderRadius: "20px 20px 0px 0px",
              borderTop: `1px solid ${AccentColor.blue}`,
            }}
            bg={MainColor.darkblue}
            w={"100%"}
            color="blue"
            pos={"fixed"}
            bottom={0}
            h={"10vh"}
          >
            {footer}
          </Box>
        ) : (
          ""
        )}
      </BackgroundImage>
    </>
  );
}
