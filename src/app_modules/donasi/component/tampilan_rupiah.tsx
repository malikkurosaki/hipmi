import { Text } from "@mantine/core";

export default function TampilanRupiahDonasi({nominal, fontSize}: {nominal: number, fontSize?: number}) {
  return (
    <>
      <Text fz={ fontSize ? fontSize : "md"}>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
          nominal
        )}
      </Text>
    </>
  );
}
