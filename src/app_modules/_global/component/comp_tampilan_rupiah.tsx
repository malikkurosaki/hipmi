import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { Text } from "@mantine/core";

export default function ComponentGlobal_TampilanRupiah({
  nominal,
  color,
  fontSize,
}: {
  nominal: number;
  color?: string;
  fontSize?: number;
}) {
  return (
    <>
      <Text
        fz={fontSize ? fontSize : "md"}
        style={{
          color: color ? color : "black",
        }}
      >
        Rp.{" "}
        {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
          nominal
        )}
      </Text>
    </>
  );
}
