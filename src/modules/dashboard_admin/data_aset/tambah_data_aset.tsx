import {
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

function TambahDataAset() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} centered size={"md"} radius={"md"}>
        <FormTambahData />
      </Modal>

      <Group position="center">
        <Button
          onClick={open}
          color="green.9"
          bg={"#17594A"}
          radius={"xl"}
          w={150}
        >
          Tambah
        </Button>
      </Group>
    </>
  );
}

export function FormTambahData() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Box>
        <Stack>
          <Box>
            <Group position="center">
              <Text fw={"bold"} color="#17594A" fz={20}>
                Tambah Data Aset
              </Text>
            </Group>
          </Box>
          <TextInput radius={"lg"} placeholder="input judul" />
          <Textarea radius={"lg"} placeholder="input isi Berita" />
            <Box>
              <TextInput radius={"lg"} placeholder="input tanggal" />
            </Box>
            <Box>
              <Group>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => <Button fullWidth {...props} radius={"lg"} color="gray"  >Upload image</Button>}
                </FileButton>
              </Group>
              {file && (
                <Text size="sm" align="center" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Box>

          <Button mt={10} mb={20} fullWidth radius={"lg"} color="green.9" bg={"#17594A"} >TAMBAH</Button>
        </Stack>
      </Box>
    </>
  );
}

export default TambahDataAset;
