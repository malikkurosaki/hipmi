"use client";

import { Box, Title, Divider } from "@mantine/core";

export default function ComponentAdminGlobal_HeaderTamplate({name}: {name: string}) {
  return (
    <>
      <Box>
        <Title>{name ?  name : null}</Title>
        <Divider/>
      </Box>
    </>
  );
}
