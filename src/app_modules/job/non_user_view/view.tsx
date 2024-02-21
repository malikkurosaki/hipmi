"use client";

import { Stack, Text } from "@mantine/core";
import ComponentJob_DetailData from "../component/detail/detail_data";

export default function Job_NonUserView() {
  return (
    <>
      <Stack>
        <ComponentJob_DetailData />
        <Text></Text>
      </Stack>
    </>
  );
}
