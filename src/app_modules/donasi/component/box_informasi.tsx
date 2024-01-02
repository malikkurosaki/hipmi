import { Center, Grid, Group, Paper, Text, Title } from "@mantine/core";

export default function BoxInformasiDonasi({
  informasi,
}: {
  informasi: string;
}) {
  return (
    <>
      <Paper bg={"blue.3"} p={"sm"}>
        <Group>
         

          <Text fz={"xs"}  fs={"italic"}>
          <Text span inherit c={"red"}>* </Text>
            {informasi}
          </Text>
        </Group>
      </Paper>
    </>
  );
}
