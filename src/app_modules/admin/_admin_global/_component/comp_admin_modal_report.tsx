"use client";

import { Modal, Stack, Textarea, Group, Button } from "@mantine/core";
import React from "react";

export function Admin_ComponentModalReport({
  opened,
  onClose,
  title,
  onHandlerChange,
  buttonKanan,
  buttonKiri,
}: {
  opened: any;
  onClose: () => void;
  title: string;
  onHandlerChange: (val: any) => void;
  buttonKanan: React.ReactNode;
  buttonKiri: React.ReactNode;
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        size={"sm"}
        centered
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            placeholder="Masukan alasan penolakan"
            onChange={onHandlerChange}
          />
          <Group position="right">
            {buttonKiri}
            {buttonKanan}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
