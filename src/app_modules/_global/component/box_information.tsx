import { Center, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";

export default function ComponentGlobal_BoxInformation({
  informasi,
 isReport,
}: {
  informasi: string;
  isReport?: boolean;
}) {
  return (
    <>
      {isReport ? (
        <Paper
          bg={"blue.3"}
          p={10}
          style={{
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          }}
        >
          <Stack spacing={0}>
            <Text fz={10} fs={"italic"} c={"orange"} fw={"bold"}>
              * Report
            </Text>
            <Text fz={10} c={"white"}>
              {informasi}
            </Text>
          </Stack>
        </Paper>
      ) : (
        <Paper
          bg={"blue.3"}
          p={10}
          style={{
            backgroundColor: AccentColor.blue,
            border: `1px solid ${AccentColor.skyblue}`,
          }}
        >
          <Group>
            <Text fz={10} c={"red"} fw={"bold"}>
              *{" "}
              <Text span inherit c={"white"} fw={"normal"}>
                {informasi}
              </Text>
            </Text>
          </Group>
        </Paper>
      )}
    </>
  );
}
