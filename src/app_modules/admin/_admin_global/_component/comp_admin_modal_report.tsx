"use client";

import { Group, Modal, Stack, Textarea } from "@mantine/core";
import React from "react";

export function Admin_ComponentModalReport({
  opened,
  onClose,
  title,
  onHandlerChange,
  buttonKanan,
  buttonKiri,
  cekInputKarakter,
  value,
}: {
  opened: any;
  onClose: () => void;
  title: string;
  onHandlerChange: (val: React.ChangeEvent<HTMLTextAreaElement>) => void;
  buttonKanan: React.ReactNode;
  buttonKiri: React.ReactNode;
  cekInputKarakter?: React.ReactNode;
  value?: string;
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
          <Stack spacing={"xs"}>
            <Textarea
              autosize
              value={value}
              minRows={3}
              maxRows={5}
              placeholder="Masukan alasan penolakan"
              onChange={onHandlerChange}
            />
            {cekInputKarakter && cekInputKarakter}
          </Stack>

          <Group position="right">
            {buttonKiri}
            {buttonKanan}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
