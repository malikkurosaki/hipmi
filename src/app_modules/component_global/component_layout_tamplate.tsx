"use client";

import {
  Box,
  Stack
} from "@mantine/core";

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
          // bg={"black"}
          pos={"sticky"}
          top={0}
          h={"7vh"}
        >
          {header}
        </Box>

        {/* Children */}
        <Box p={"md"} pos={"static"}>
          <Stack>
            {children}
            {footer ? (
              <Box
                style={{
                  height: "10vh",
                }}
              ></Box>
            ) : (
              ""
            )}
          </Stack>
        </Box>

        {/* Footer */}
        {footer ? (
          <Box
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
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
