import { Overlay, Center, Loader } from "@mantine/core";
import { MainColor } from "../color";

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
            size={size ? size : 40}
            color={MainColor.yellow}
          />
        </Center>
      </Overlay>
    </>
  );
}
