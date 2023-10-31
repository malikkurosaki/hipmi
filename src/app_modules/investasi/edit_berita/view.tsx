"use client";

import {
  AspectRatio,
  Button,
  Center,
  FileInput,
  Image,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

export default function EditBeritaInvestasi() {
  return (
    <>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <Image alt="" src={"/aset/no-img.png"} />
        </AspectRatio>
        <Center>
          <Button leftIcon={<IconUpload size={10} />} compact radius={50}>
            Upload
          </Button>
        </Center>
        <TextInput label="Judul berita" />
        <Textarea label="Deskripsi" autosize minRows={2} maxRows={6} />
      </Stack>
    </>
  );
}
