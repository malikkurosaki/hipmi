"use client";

import { Box, Group, Text } from "@mantine/core";
import Marquee from "react-fast-marquee";

export default function ComponentGlobal_MaintenanceInformation() {
  return (
    <>
      <Box w={"100%"}>
        <Marquee>
          <Group spacing={"xs"}>
            {Array(5)
              .fill(0)
              .map((e, i) => (
                <Box key={i}>
                  <Text px={"md"}>Maintenance ! </Text>
                </Box>
              ))}
          </Group>
        </Marquee>
      </Box>
    </>
  );
}
