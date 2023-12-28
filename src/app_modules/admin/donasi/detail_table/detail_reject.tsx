"use client";

import { Button, Stack, Text } from "@mantine/core";

export default function AdminDonasi_DetailReject({
  closeModal,
}: {
  closeModal: any;
}) {
  return (
    <>
      <Stack>
        <Text>Cooming Soon</Text>
        <Button onClick={() => closeModal()}>close</Button>
      </Stack>
    </>
  );
}
