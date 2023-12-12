"use client";

import { Center, Divider, Stack, Title } from "@mantine/core";
import Admin_Investasi from "../investasi/main/view";

export default function AdminMain() {
  return (
    <>
      <Stack spacing={"sm"}>
        <Title>Main Dashboard</Title>
        <Divider mb={"md"} />
        <Stack align="center" justify="center" h={"80vh"}>
          <Title>Cooming Soon !!</Title>
        </Stack>
      </Stack>
    </>
  );
}
