"use client";

import { Overlay, Center, Loader } from "@mantine/core";

export default function ComponentGlobal_CardLoadingOverlay({
  size,
  variant,
}: {
  size?: number;
  variant?: any;
}) {
  return (
    <>
      <Overlay h={"100%"} opacity={0.1}>
        <Center h={"100%"}>
          <Loader
            variant={variant ? variant : "dots"}
            size={size ? size : 20}
            color="gray"
          />
        </Center>
      </Overlay>
    </>
  );
}
