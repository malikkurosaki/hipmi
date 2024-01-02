"use client";

import { NotifPeringatan } from "@/app_modules/donasi/component/notifikasi/notif_peringatan";
import { Box, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Coba() {
  return (
    <>
      <Box p={"lg"}>
        <Group position="center">
          <Button variant="outline" onClick={() => NotifPeringatan("Coba")}>
            Show notification
          </Button>
        </Group>
      </Box>
    </>
  );
}
