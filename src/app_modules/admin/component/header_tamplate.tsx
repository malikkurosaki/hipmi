"use client";

import { Box, Title, Divider, Stack } from "@mantine/core";

export default function ComponentAdminGlobal_HeaderTamplate({name}: {name: string}) {
  return (
    <>
      <Stack spacing={"xs"} >
        <Title>{name ?  name : null}</Title>
        <Divider/>
      </Stack>
    </>
  );
}
