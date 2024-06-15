import { Center, Grid, Group, Paper, Text, Title } from "@mantine/core";

export default function ComponentKatalog_NotedBox({
  informasi,
}: {
  informasi: string;
}) {
  return (
    <>
      <Paper bg={"blue.3"} p={10}>
        <Group>
          <Text fz={10} fs={"italic"}>
            <Text span inherit c={"red"}>
              *{" "}
            </Text>
            {informasi}
          </Text>
        </Group>
      </Paper>
    </>
  );
}
