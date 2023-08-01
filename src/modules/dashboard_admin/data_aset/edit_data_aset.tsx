import {
  ActionIcon,
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

function EditDataAset() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} centered size={"md"} radius={"md"}>
        <FormEditData />
      </Modal>

      <Group position="center">
      <ActionIcon onClick={open}>
          <CiEdit />
        </ActionIcon>
      </Group>
    </>
  );
}

export function FormEditData() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Box>
        <Stack>
          <Box>
            <Group position="center">
              <Text fw={"bold"} color="#17594A" fz={20}>
                Edit Data Aset
              </Text>
            </Group>
          </Box>
          <TextInput radius={"lg"} placeholder="input judul" />
          <Textarea radius={"lg"} placeholder="input isi Berita" />
          <Group position="apart">
            <Box>
              <Group>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => <Button {...props} w={350} radius={"lg"} color="green.9" bg={"#17594A"} >Upload image</Button>}
                </FileButton>
              </Group>
              {file && (
                <Text size="sm" align="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Box>
            <Box>
              <TextInput radius={"lg"} placeholder="input tanggal" w={350} />
            </Box>
          </Group>
          <Button mt={20} mb={20} fullWidth radius={"lg"} color="green.9" bg={"#17594A"} >TAMBAH</Button>
        </Stack>
      </Box>
    </>
  );
}

export default EditDataAset;
