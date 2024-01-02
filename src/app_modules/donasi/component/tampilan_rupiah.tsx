import { Text } from "@mantine/core";

export default function TampilanRupiahDonasi({nominal}: {nominal: number}) {
  return (
    <>
      <Text>
        Rp.{" "}
        {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 10 }).format(
          nominal
        )}
      </Text>
    </>
  );
}
