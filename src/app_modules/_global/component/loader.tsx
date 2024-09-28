import { Loader } from "@mantine/core";
import { MainColor } from "../color/color_pallet";

export default function ComponentGlobal_Loader({ size }: { size?: number }) {
  return (
    <>
      <Loader color={MainColor.yellow} size={size ? size : 20} />
    </>
  );
}
