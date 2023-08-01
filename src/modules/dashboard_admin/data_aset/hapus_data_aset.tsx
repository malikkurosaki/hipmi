import {
  ActionIcon,
  Alert,
  Box,
  Button,
  FileButton,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { BsDatabaseCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiFillAlert, AiOutlineDelete } from "react-icons/ai";

function HapusDataAset() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} centered size={"md"} radius={"md"} withCloseButton={false}>
        <NotivHapus />
      </Modal>

      <Group position="center">
        <ActionIcon onClick={open}>
          <AiOutlineDelete />
        </ActionIcon>
      </Group>
    </>
  );
}

export function NotivHapus() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Box>
        <Alert
          icon={<AiFillAlert size="1rem"  />}
          title="Apakah Anda Ingin Menghapus Data?"
          color="red"
          radius="md"
        >
          <Group position="apart">
            <Button w={150} color="red">TIDAK</Button>
            <Button w={150} color="green.9">YA</Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

export default HapusDataAset;
