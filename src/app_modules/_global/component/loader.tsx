import { Loader } from "@mantine/core";
import { MainColor } from "../color/color_pallet";

export default function ComponentGlobal_Loader({
  size,
  variant,
}: {
  size?: number;
  variant?: "dots" | "bars" | "oval";
}) {
  return (
    <>
      <Loader
        variant={variant ? variant : "oval"}
        color={MainColor.yellow}
        size={size ? size : 20}
      />
    </>
  );
}
