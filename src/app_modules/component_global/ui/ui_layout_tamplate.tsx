import {
  BackgroundImage,
  Box,
  Container,
  Footer,
  ScrollArea,
} from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";

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
      <BackgroundImage src={"/aset/global/main_background.png"} h={"100vh"} style={{position: "relative"}}>
        {/* Header */}
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

        {/* Children */}
        <Box style={{zIndex: 0}} h={footer ? "82vh" : "92vh"} pos={"static"}>
          <ScrollArea h={"100%"} px={"md"}>
            {children}
          </ScrollArea>
        </Box>

        {/* Footer */}
        {footer ? (
          <Box style={{ position: "relative", bottom: 0 }} >
            <Box
              style={{
                zIndex: 10,
                borderRadius: "20px 20px 0px 0px",
                borderTop: `2px solid ${AccentColor.blue}`,
                borderRight: `1px solid ${AccentColor.blue}`,
                borderLeft: `1px solid ${AccentColor.blue}`,
                width: "100%",
              }}
              bg={AccentColor.darkblue}
              color="blue"
              pos={"absolute"}
              // bottom={0}
              h={"10vh"}
            >
              {footer}
            </Box>
          </Box>
        ) : (
          ""
        )}
      </BackgroundImage>
    </>
  );
}
