"use client";

import {
  Box,
  Center,
  Group,
  LoadingOverlay,
  Skeleton,
  Text,
} from "@mantine/core";

export default function ComponentAdminGlobal_LoadingPage() {
  const listhHuruf = [
    {
      huruf: "H",
    },
    {
      huruf: "I",
    },
    {
      huruf: "P",
    },
    {
      huruf: "M",
    },
    {
      huruf: "I",
    },
  ];
  const customLOader = (
    <Center h={"90vh"}>
      <Group>
        {listhHuruf.map((e, i) => (
          <Center key={i} h={"100%"}>
            <Skeleton height={50} circle radius={"100%"} />
            <Text sx={{ position: "absolute" }} c={"gray.4"} fw={"bold"}>
              {e.huruf}
            </Text>
          </Center>
        ))}
      </Group>
    </Center>
  );

  return (
    <>
      {/* <LoadingOverlay visible  loader={customLOader} /> */}
      <Box>
        {customLOader}
      </Box>
    </>
  );
}
